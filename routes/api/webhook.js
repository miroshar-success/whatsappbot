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
    let data = req.body;
    let instanceId = data.instanceId;
    let instance = await WaInstance.findOne({in_id : instanceId});
    if (!instance) {
        return;
    }
    let keywords = await WaBot.find({in_id : instanceId});
    if (keywords.length != 0) {
        let messages = data.messages;
        for (let i = 0; i < messages.length; i++) {
            let message = messages[i];
            let def = await WaBot.findOne({in_id : instanceId,message_type : "Default"});
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
            let checkApiText = await WaData.findOne({in_id : instance_id,response_type : "Api Text"});
            if (checkApiText) {
                let getpdfURL = await axios.get("http://localhost/check.php?no="+(message.body).replace(" ", ""));
                if (getpdfURL !== false) {
                    let postdata = {chatId : chatID,body:getpdfURL,filename : "File"};
                    let result = await axios.get(instance.url+"/sendFile?token="+instance.token,postdata);
                    const checkApiTextID = checkApiText.id;
                    let up = await  WaData.findOneAndUpdate({in_id : instance_id,response_type : "Api Text"},{$set : {updated_at : Date.now()}});
                    continue;
                }
            }

            let ddcheck = 1;
            let check = await WaBotWelcome.findOne({in_id : instanceId,chat_id : chatID});
            if(!check){
                let welcomeMessages = await WaBot.find({in_id : instanceId,message_type : {$in : ["Welcome","Welcome2","Welcome3"]}});
                if(welcomeMessages.length != 0){
                    ddcheck = 1;
                    
                    let checkStatus = await axios.get(instance.url+"/status?token="+instance.token);
                    checkStatus = checkStatus.data;
                    if (checkStatus.accountStatus == "authenticated") {
                        for (let j = 0; j < welcomeMessages.length; j++) {
                            let welcomeMessage = welcomeMessages[j];
                            if ((welcomeMessage.message).indexOf("[json]") !== -1) {
                                welcomeMessage.message = (welcomeMessage.message).replace("[json]","");
                                let jsonData = await axios.get("http://localhost/check.php");
                                if (jsonData) {
                                    welcomeMessage.message = welcomeMessage.message+" "+jsonData;
                                }
                            }
                            let postdata = {chatId : chatID,body:welcomeMessage.message};
                            let result = await axios.post(instance.url+"/sendMessage?token"+instance.token,postdata);
                        }
                        let insert = {
                            in_id : instanceId,
                            chat_id : chatID,
                        };
                        let useDefaultAudience = 0;
                        let sourceKeyWords = await WaSourceKeyword.find({in_id : instance_id});
                        if (sourceKeyWords.length) {
                            for (let k = 0; k < sourceKeyWords.length; k++) {
                                let sourceKeyWord = sourceKeyWords[k];
                                if ((message.body).search("/"+sourceKeyWord+"/i")) {
                                    if (sourceKeyWord.audience_id) {
                                        let audienceID = sourceKeyWord.audience_id;
                                        let marketingApi = await axios.get("http://instagram.bomber.co.il/fb/marketing.php?audience_id="+audienceID+"&phone="+chatID.split("@")[0]);
                                        insert.fbapi_response = marketingApi;
                                        useDefaultAudience = 1;
                                    }
                                    insert.source = sourceKeyWord.keyword;
                                    insert.source_id = sourceKeyWord.id;
                                    break
                                }
                                
                            }
                        }

                        if (useDefaultAudience == 1) {
                            if (instance.default_audience_id) {
                               let audienceID = instance.default_audience_id;
                               let marketingApi = await axios.get("http://instagram.bomber.co.il/fb/marketing.php?audience_id="+audienceID+"&phone="+chatID.split("@")[0]);
                                insert.fbapi_response = marketingApi;
                            }
                        }
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
                        newwabotwelcome.save()

                    }
                }
            }

            let checkSourced = await WaBotWelcome.findOne({in_id : instanceId,chat_id : chatID});
            if (!checkSourced) {
                return;
            }

            let formated_keywords = [];

            if (!checkSourced.source_id) {
                for (let p = 0; p < keywords.length; p++) {
                    let keyword = keywords[p];
                    if (keyword.message_type != "Welcome" && keyword.message_type != "Default" && keyword.message_type != "AI") {
                        if (keyword.skid == checksourced.source_id) {
                            let kwrds = (keyword.keyword).split("||");
                            for (let q = 0; q < kwrds.length; q++) {
                                let kwrd = kwrds[q];
                                let temp = [];
                                temp.id = keyword.id;
                                temp.keyword = kwrd;
                                formated_keywords.push(temp)
                            }
                        }
                    }
                    
                }
            }
            else{
                let checkKeywordType = await WaSourceKeyword.findOne({id : checksourced.source_id});
                if (checkKeywordType.type == "Default") {
                    for (let uu = 0; uu < keywords.length; uu++) {
                        let keyword = keywords[uu];
                        if (keyword.message_type != "Welcome" && keyword.message_type != "Default" && keyword.message_type != "AI") {
                            if (!keyword.skid) {
                                let kwrds = (keyword.keyword).split("||");
                                for (let dd = 0; dd < kwrds.length; dd++) {
                                    let kwrd = kwrds[dd];
                                    let temp = [];
                                    temp.id = keyword.id;
                                    temp.keyword = kwrd;
                                    formated_keywords.push(temp)

                                    
                                }
                            }
                        }
                        
                    }
                }
                else{
                    for (let ee = 0; ee < keywords.length; ee++) {
                        let keyword = keywords[ee];
                        if (keyword.message_type != "Welcome" && keyword.message_type != "Default" && keyword.message_type != "AI") {
                            if (keyword.skid == checksourced.source_id) {
                                let kwrds = (keyword.keyword).split("||");
                                for (let dd = 0; dd < kwrds.length; dd++) {
                                    let kwrd = kwrds[dd];
                                    let temp = [];
                                    temp.id = keyword.id;
                                    temp.keyword = kwrd;
                                    formated_keywords.push(temp)
                                    
                                }
                            }
                        }                        
                    }
                }
            }

            let skeyword = [];
            let sid = [];
            for (let kk = 0; kk < formated_keywords.length; kk++) {
                skeyword[formated_keywords[kk]['id']] = formated_keywords[kk]['keyword'];
                sid[formated_keywords[kk]['id']] = formated_keywords[kk]['id'];
            }

            for (let m = 0; m < formated_keywords.length; m++) {
                let form_keyword = formated_keywords[m];
                if (!form_keyword['keyword']) {
                    continue;
                }
                if ((message.body).indexOf(form_keyword['keyword'])) {
                    let keyword = await WaBot.findOne({id : form_keyword['id']});
                    ddcheck = 1;
                    let checkStatus = await axios.get(instance.url+"/status?token="+instance.keyword);
                    checkStatus = checkStatus.data;
                    if (checkStatus.accountStatus == "authenticated") {
                        let postdata = {chatId : chatID,body :keyword.message};
                        let result = await axios.post(instance.url+"/sendMessage?token="+instance.token,postdata);
                        let past = await WaData.aggregate([
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
                        let newWabotData = new WaData({
                            id : newId,
                            in_id : instanceId,
                            client_text : message.body,
                            bot_text : keyword.message,
                            response_type : "Text",
                            client_number : chatID.split("@")[0],
                            name : message.senderName && message.senderName != "" ? message.senderName : ""
                        });
                        newWabotData.save()
                    }
                }
               
            }

            if (!ddcheck) {
                let AI = await WaBot.findOne({in_id : instanceId,message_type : "AI"});
                let def = await WaBot.findOne({in_id : instanceId,message_type : "Default"});
                if (def) {
                    let postdata = {chatId : chatID,body : def.message}
                    let result = await axios.post(instance.url+"/sendMessage?token="+instance.token,postdata);
                    let past = await WaData.aggregate([
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
                    let addWabotData = new WaData({
                        id : newId,
                        in_id : instanceId,
                        client_text : message.body,
                        bot_text : def.message,
                        response_type : "Default",
                        client_number : chatID.split("@")[0],
                        name : message.senderName && message.senderName != "" ? message.senderName : ""
                    })
                    addWabotData.save();
                }
            }
        }
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