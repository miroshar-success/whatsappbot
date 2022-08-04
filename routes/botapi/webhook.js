const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/keys');
const WaInstance = require('../../models/WaInstance');
const WaBot = require('../../models/WaBot');
const WaData = require('../../models/WaData');
const { default: axios } = require('axios');
const WaBotWelcome = require('../../models/WaBotWelcome');
const WaSourceKeyword = require('../../models/WaSourceKeyword');


router.post("/webhook",async (req,res) => {
    try {
        let data = req.body;
        let instanceId = data.instanceId;
        let instance = await WaInstance.findOne({in_id : instanceId});
        if (!instance) {
            return;
        }

        let keywords = await WaBot.find({in_id : instanceId,instance_id : instance.id});
        if (keywords.length != 0) {
            let messages = data.messages;
            if(!messages) return;
            for (let i = 0; i < messages.length; i++) {
                let message = messages[i];
                let def = await WaBot.findOne({in_id : instanceId,message_type : "Default",instance_id : instance.id});
                if (!def) {
                    if (def.message == message.body) {
                        continue;
                    }
                }

                if (message.type == "chat") {
                    if (message.fromMe) {
                        continue;
                    }
                }

                let chatID = message.chatId;
                let checkApiText = await WaData.findOne({in_id : instanceId,response_type : "Api Text"});
                let ddcheck = 1;
                let check = await WaBotWelcome.findOne({in_id : instanceId,chat_id : chatID});
                if(!check){
                    let welcomeMessages = await WaBot.find({in_id : instanceId,message_type : {$in : ["Welcome","Welcome2","Welcome3"]}});
                    if(welcomeMessages.length != 0){
                        ddcheck = 1;
                        
                        let checkStatus = await axios.get(instance.url+"/status?token="+instance.token);
                        checkStatus = checkStatus.data;
                        console.log(checkStatus)
                        if (checkStatus.accountStatus == "authenticated") {
                            let insert = {
                                in_id : instanceId,
                                chat_id : chatID,
                            };
                            let past = await WaBotWelcome.aggregate([
                                {
                                    $group : {
                                        _id : "_id",
                                        maxQ : {
                                            $max : "$id"
                                        }
                                    }
                                }
                            ]);
                            let newId = (past[0]? past[0].maxQ : 0) * 1 + 1;
                            insert.id = newId;
                            const newwabotwelcome = new WaBotWelcome(insert);
                            await newwabotwelcome.save()
                            for (let j = 0; j < welcomeMessages.length; j++) {
                                let welcomeMessage = welcomeMessages[j];
                                let postdata = {chatId : chatID,body:welcomeMessage.message};
                                let result = await axios.post(instance.url+"/sendMessage?token="+instance.token,postdata);
                            }
                            

                        }
                    }
                }

                //find appreciate keyword 
                let matchkeywords = keywords
                .filter(keyword => (keyword.message_type != "Welcome" && keyword.message_type != "Default" && keyword.message_type != "AI"))
                .map(keyword => {
                    return {
                        words :  keyword.keyword.split("||"),
                        message : keyword.message,
                        message_type : keyword.message_type,
                        file : keyword.filecontent,
                        match : 0
                    }
                })
                for (let kp = 0; kp < matchkeywords.length; kp++) {
                    let match = matchkeywords[kp];
                    for (let mp = 0; mp < match.words.length; mp++) {
                        let test = new RegExp(match.words[mp], "i")
                        if (message.body.search(test) != -1) {
                            matchkeywords[kp].match ++;
                        }                        
                    }                    
                }

                //send Message

                matchkeywords.sort((a,b) => b.match - a.match);
                let sendmessag = matchkeywords[0].message ;
                console.log(sendmessag,matchkeywords[0].match)
                let sendData;
                if (matchkeywords[0].match == 0) {
                    sendData = {chatId : chatID,body:def.message};
                    await axios.post(instance.url+"/sendMessage?token="+instance.token,sendData);
                }else{
                    switch (matchkeywords[0].message_type) {
                        case "Text":
                            sendData = {chatId : chatID,body:sendmessag};
                            await axios.post(instance.url+"/sendMessage?token="+instance.token,sendData);
                            break;
                        case "Link":
                            let title = sendmessage.split("+")[0];
                            let link = sendmessage.split("+")[1];
                            sendData = {chatId : chatID,body : link,title : title,previewBase64:matchkeywords[0].file};
                            await axios.post(instance.url+"/sendLink?token="+instance.token,sendData);
                            break;
                        case "File or Photo":
                            sendData = {chatId : chatID,body : matchkeywords[0].file,filename : sendmessag};
                            await axios.post(instance.url+"/sendFile?token="+instance.token,sendData);
                            break;
                        default:
                            break;
                    }
                }
                
                
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : "err"});
    }
    
})

router.post("/sendMes",async (req,res) => {
    const {number,message,instanceid,secret} = req.body;
    if (secret != "ofir2362") {
        return  res.json({mes : "Not Authenticated"});
    }
    if(number == "" || message == "" || instanceid == ""){
        return res.json({mes : "Missing Parameters"});
    }
    let instance = await WaInstance.findOne({in_id : instanceid});
    let checkStatus = await axios.get(instance.url+"/status?token="+instance.token);
    checkStatus = checkStatus.data;
    if (checkStatus.accountStatus == "authenticated") {
        let postdata = {phone : number,body:message};
        let result = await axios.post(instance.url+"/sendMessage?token="+instance.token,postdata);
        return res.json({msg : "Message Sent Successfully"})
    }else{
        return res.json({msg : "Instance Not Authenticated."});
    }

})
module.exports = router;