const express = require('express');
const axios = require("axios");
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/keys');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const multer = require("multer");
const upload = multer({dest : './uploads/'})

const auth = require("../../middleware/auth");
const WaInstance = require("../../models/WaInstance");
const WaBot = require("../../models/WaBot");
const WaMessageTask = require('../../models/WaMessageTask');
const WaReciever = require('../../models/WaReciever');


// @route    POST api/instances
// @desc     get instances
// @access   Private
router.post("/getinstances",auth,async (req,res) => {
    const result = await WaInstance.find({});
    res.json(result);
})

// @route    POST api/instances
// @desc     edit instances
// @access   Private
router.post("/setinstances",auth,async (req,res) => {
    const {key} = req.user;
    const {audience,mins,reminder} = req.body;
    console.log(key,audience);
    const up = await WaInstance.findOneAndUpdate({user_id : key},{$set : {default_audience_id : audience,reminder : reminder}});
    res.json({msg : "success"});
})

// @route    POST api/instances
// @desc     Get key data
// @access   Private
router.post("/getkeyword",auth,async (req,res) => {
    const {instance_id,id} = req.body;
    const {key} = req.user;
    console.log(instance_id,id);
    const check = await WaInstance.findOne({user_id : key,id : instance_id});
    const kw = await WaBot.findOne({instance_id,id});
    res.json({check,kw});
})

// @route    POST api/instances
// @desc     Edit key data
// @access   Private
router.post("/editkeyword",auth,async (req,res) => {
    const {id,keyword,message} = req.body;
    const up = await WaBot.findOneAndUpdate({id},{$set : {keyword , message}});
    res.json({msg : "success"})
})

// @route    POST api/instances
// @desc     delete key data
// @access   Private
router.post("/deletekeyword",auth,async (req,res) =>{
    const {id} = req.body;
    console.log(id);
    const del = await WaBot.findOneAndDelete({id});
    res.json({msg : "success"})
})

// @route    POST api/instances
// @desc     set Webhook
// @access   Private
router.post("/setwebhook",auth,async (req,res) => {
    const {key} = req.user;
    const {instance_id } = req.body;
    const check = await WaInstance.findOne({user_id : key ,id : instance_id});
    // console.log(check);
    let checkStauts = await axios.get(check.url+"/status?token="+check.token);
    checkStauts = checkStauts.data;
    if (checkStauts.accountStatus == "authenticated") {
        let result = await axios.post(check.url+"/webhook?token="+check.token,{webhookUrl : "localhost:3000/wa/bot/webhook"});
        console.log(process.env.url);
        //Ignore old mes
        result = await axios.post(check.url+"/settings?token="+check.token,{ignoreOldMessages : true})
        res.json({msg : "success"});

    }else{
        res.json({msg : "error"});
    }
   
})

// @route    POST api/instances
// @desc     set Message Task
// @access   Private

router.post("/storeMessageTask",auth,async (req,res) => {
    const {key} = req.user;
    const {instance_id,message,delay,pause,iterations,csvdata} = req.body;
    const check = await WaMessageTask.findOne({instance_id});
    console.log(instance_id,message,delay,iterations,csvdata);
    const tempmess = message.split("||");
    if(check){
        const up = await WaMessageTask.findOneAndUpdate({instance_id},{delay,pause,iterations,message});
        const del = await WaReciever.deleteMany({task_id : check.id});
        const mcount = tempmess.length;
        let j = -1;
        for (let i = 0; i < csvdata.length; i++) {
            j ++;
            let past = await WaReciever.aggregate([
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
           let newReceiver = new WaReciever({
            id : newId,
            user_id : key,
            instance_id : instance_id,
            task_id : check.id,
            receiver : csvdata[i][0],
            message : tempmess[j]
           })
           await newReceiver.save();
           if (j >= (mcount -1)) {
                j --;
           }
        }
    }else{
        let past = await WaReciever.aggregate([
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
        const newWaMessage = new WaMessageTask({
            id : newId,
            user_id : key,
            instance_id : instance_id,
            delay : delay,
            pause : pause,
            iterations : iterations,
            message : message
        })
        await newWaMessage.save();
        const mcount = tempmess.length;
        let j = -1;
        for (let i = 0; i < csvdata.length; i++) {
            j ++;
            let newId = await WaReciever.aggregate([
                {
                    $group : {
                        _id : "id",
                        maxQ : {
                            $max : "$id"
                        }
                    }
                }
            ]);
            newId = newId[0]['maxQ'] + 1; 
           let newReceiver = new WaReciever({
            id : newId,
            user_id : key,
            instance_id : instance_id,
            task_id : check.id,
            receiver : csvdata[i][0],
            message : tempmess[j]
           })
           await newReceiver.save();
           if (j >= (mcount -1)) {
                j --;
           }
        }
    }
    res.json({msg : "success"});
})

// @route    POST api/instances
// @desc     get Message Task
// @access   Private
router.post("/getMessageTask",auth,async (req,res) => {
    const {key} = req.user;
    const {instance_id} = req.body;
    const check = await WaInstance.findOne({user_id : key,id:instance_id});
    const task = await WaMessageTask.findOne({instance_id});
    res.json({check,task});
})

router.post("/getLogs",auth,async (req,res) => {
    const {key} = req.user;
    const {instance_id} = req.body;
    const logs = await WaReciever.find({instance_id : instance_id,user_id : key});
    res.json(logs);
})

router.post("/deleteInstance",auth,async (req,res) => {
    const {instance_id} = req.body;
    const {key} = req.user;
    const del = await WaInstance.findOneAndDelete({id : instance_id,user_id : key});
    res.json({msg : "success"});
})

router.post("/exportNum",auth,async (req,res) => {
    const {instance_id} = req.body;
    const {key} = req.user;
    const check = await WaInstance.findOne({id : instance_id,user_id : key});
    let checkStauts = await axios.get(check.url+"/status?token="+check.token);
    checkStauts = checkStauts.data;
    if (checkStauts.accountStatus == "authenticated"){
        const getdialogs = await axios.post(check.url+"/dialogs",{})

    }
    res.json({msg : "success"});
})

router.post("/makePublicorPrivate",auth,async (req,res) => {
    const {instance_id} = req.body;
    const {key} = req.user;
    console.log(instance_id,key);
    const public = await WaInstance.findOne({id : instance_id,user_id : key});
    if (!public) {
        return res.status(400).json({msg : "No data"})
    }
    const newPublic = 1 - public.public;
    const up = await WaInstance.findOneAndUpdate({id : instance_id,user_id : key},{$set : {public : newPublic}});
    res.json({msg : "success"});
})

router.post("/insertInstance",auth,async (req,res) => {
    try {
        const {url,label,token} = req.body;
        const {key} = req.user;
        let pos = url.indexOf("instance");
        let in_id = url.substr(pos+8);
        let past = await WaInstance.aggregate([
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
        const newInstance = new WaInstance({
            id : newId,
            user_id : key,
            label : label,
            token : token,
            url : url,
            in_id : in_id * 1
        })
        await newInstance.save();
        res.json({msg : "success"});
    } catch (error) {
        res.json({msg : "error"})
    }
    
})
module.exports = router;
