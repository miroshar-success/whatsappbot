const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/keys');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const auth = require("../../middleware/auth");
const WaData = require('../../models/WaData');
const WaBot = require("../../models/WaBot");
const WaSourceKeyword = require("../../models/WaSourceKeyword");
const WaInstance = require('../../models/WaInstance');

// @route    POST api/datas
// @desc     get wadata
// @access   Private
router.post("/getwadata",auth,async (req,res) => {
    const result = await WaData.find({data_type : "Initial"});
    res.json(result);
})

// @route    POST api/datas
// @desc     insert wadata
// @access   Private
router.post("/insertwadata",auth,async (req,res) => {
    const {question,answer} = req.body;
    let newId = await WaData.aggregate([
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
    const newWadata = new WaData({
        id : newId,
        client_text : question,
        bot_text : answer,
        data_type : "Initial"
    });
    const savedata = await newWadata.save();
    const result = await WaData.find({data_type : "Initial"});
    res.json(result);
})

// @route    POST api/datas
// @desc     insert wadata
// @access   Private
router.post("/deletewadata",auth,async(req,res) => {
    const {_ID} = req.body;
    const del = await WaData.findOneAndDelete({id : _ID});
    const result = await WaData.find({data_type : "Initial"})
    res.json(result)
} )

// @route    POST api/datas
// @desc     get traindatas
// @access   Private
router.post("/gettraindata",auth,async(req,res) => {
    const {in_id} = req.body;
    console.log(in_id);
    const result = await WaData.find({response_type : "Default",in_id : in_id});
    res.json(result)
} )

// @route    POST api/datas
// @desc     get data by Id
// @access   Private
router.post("/getdata",auth,async(req,res) => {
    const {id} = req.body;
    const result = await WaData.findOne({id});
    res.json(result)
} )

// @route    POST api/datas
// @desc     Edit data by Id
// @access   Private
router.post("/editdata",auth,async(req,res) => {
    const {id,question,answer} = req.body;
    console.log(req.body);
    const result = await WaData.findOneAndUpdate({id},{$set : {client_text : question, bot_text : answer,response_type : "Text"}});
    // const result = await WaData.find({response_type : "Default"});

    res.json(result)
} )

// @route    POST api/datas
// @desc     get Bot data with instance Id
// @access   Private
router.post("/getbotbyinstance",auth,async (req,res) => {
    const {instance_id} = req.body;
    const {key} = req.user;
    const check = await WaInstance.findOne({user_id : key});
    const wcheck = await WaBot.findOne({instance_id: instance_id,message_type : "Welcome"});
    const w2check = await WaBot.findOne({instance_id: instance_id,message_type : "Welcome2"});
    const w3check = await WaBot.findOne({instance_id: instance_id,message_type : "Welcome3"});
    const dcheck = await WaBot.findOne({instance_id: instance_id,message_type : "Default"});
    const acheck = await WaBot.findOne({instance_id: instance_id,message_type : "AI"});
    const keywords = await WaBot.find({instance_id : instance_id,message_type : {$ne : "Welcome"}, skid : null});
    const sourceKeywords = await WaSourceKeyword.find({instance_id});
    res.json({check,wcheck,w2check,w3check,dcheck,acheck,keywords,sourceKeywords});
})

// @route    POST api/datas
// @desc     Edit bot data with instance Id
// @access   Private
router.post("/storebot",auth,async (req,res) => {
    const {key} = req.user;
    const {welcome,welcome2,welcome3,dmessage,ai,instance_id} = req.body;
    // console.log(welcome,welcome2,welcome3,dmessage,ai,instance_id);
    let check = await WaInstance.findOne({user_id : key,id : instance_id});
    const in_id = check.in_id;
    check = await WaBot.findOne({instance_id : instance_id,message_type : "Welcome"});
    if (!check) {
        const newWabot = new WaBot({
            instance_id : instance_id,
            in_id : in_id,
            message : welcome,
            message_type : "Welcome"
        });
        const save = newWabot.save();
    }else{
        const up1 = await WaBot.findOneAndUpdate({instance_id : instance_id,message_type : "Welcome"},{$set : {message : welcome}});
    }

    if (welcome2) {
        const check2 = await WaBot.findOne({instance_id : instance_id,message_type : "Welcome2"});
        if (!check2) {
            const newWabot = new WaBot({
                instance_id : instance_id,
                in_id : in_id,
                message : welcome2,
                message_type : "Welcome2"
            });
            const save = newWabot.save();
        }else{
            const up2 = await WaBot.findOneAndUpdate({instance_id : instance_id,message_type : "Welcome2"},{$set : {message : welcome2}});
        }
    }

    if (welcome3) {
        const check3 = await WaBot.findOne({instance_id : instance_id,message_type : "Welcome3"});
        if (!check3) {
            const newWabot = new WaBot({
                instance_id : instance_id,
                in_id : in_id,
                message : welcome3,
                message_type : "Welcome3"
            });
            const save = newWabot.save();
        }else{
            const up3 = await WaBot.findOneAndUpdate({instance_id : instance_id,message_type : "Welcome3"},{$set : {message : welcome3}});
        }
    }

    const acheck = await WaBot.findOne({instance_id : instance_id,message_type : "AI"});
    if (!acheck) {
        const newWabot = new WaBot({
            instance_id : instance_id,
            in_id : in_id,
            message : ai,
            message_type : "AI"
        });
        const save = newWabot.save();
    }else{
        const up4 = await WaBot.findOneAndUpdate({instance_id : instance_id,message_type : "AI"},{$set : {message : ai}});
    }

    const dcheck = await WaBot.findOne({instance_id : instance_id,message_type : "Default"});
    if (!dcheck) {
        const newWabot = new WaBot({
            instance_id : instance_id,
            in_id : in_id,
            message : dmessage,
            message_type : "Default"
        });
        const save = newWabot.save();
    }else{
        const up5 = await WaBot.findOneAndUpdate({instance_id : instance_id,message_type : "Default"},{$set : {message : dmessage}});
    }
    res.json({msg : "success"});
})

router.post("/storesourcekeywords",auth,async (req,res) => {
    const {instance_id,audienceid,keyword,type} = req.body;
    console.log(instance_id,audienceid,keyword,type);
    const {key} = req.user;
    let check = await WaInstance.findOne({user_id : key,id : instance_id});
    const in_id = check.in_id;
    const past = await WaSourceKeyword.aggregate([
        {
            $group : {
                _id : "_id",
                maxQ : {
                    $max : "$id"
                }
            }
        }
    ]);
    const newId = (past[0]? past[0].maxQ : 0) * 1 + 1;
    const newsource = new WaSourceKeyword({
        id : newId,
        in_id : in_id,
        instance_id : instance_id,
        keyword : keyword,
        audience_id : audienceid,
        type : type
    })
    const save =  await newsource.save();
    res.json({msg : "success"})
})

router.post("/deletesourcekey",auth,async (req,res) => {
    const {id} = req.body;
    const del = await WaSourceKeyword.findOneAndDelete({id});
    res.json({msg : "success"});
})

router.post("/updatewabot",auth,async (req,res) => {
    const {id,keyword,message} = req.body;
    const up = await WaBot.findOneAndUpdate({id},{$set : {keyword,message}});
    res.json({msg : "success"})
})

router.post("/addwabot",auth,async (req,res) => {
    try {
        const {instance_id,keyword,message_type,message} = req.body;
        const {key} = req.user;
        const past = await WaBot.aggregate([
            {
                $group : {
                    _id : "_id",
                    maxQ : {
                        $max : "$id"
                    }
                }
            }
        ]);
        const newId = (past[0]? past[0].maxQ : 0) * 1 + 1;
        const check = await WaInstance.findOne({user_id: key,id : instance_id});
        const in_id = check.in_id;
        const newWabot = new WaBot({
            id : newId,
            instance_id : instance_id,
            in_id : in_id,
            keyword : keyword,
            message : message,
            message_type : message_type,
        });
        await newWabot.save();
        res.json({msg : 'success'});
    } catch (error) {
        res.status(400).json({msg : "error"});
    }
    
})

module.exports = router;