const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
//const axios = require('axios')
//const cheerio = require('cheerio')
require('../config/passport')(passport);
const Message = require('../models').Message;
const Log = require('../models').Log;

const uuid = require('uuid'); //generate time based random number
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");
const { get } = require('http');

router.get('/getLog', function (req, res) {
    
})

router.post('/addMessage', function (req, res) { //create message

    if (!req.body.name || !req.body.message) {
        res.status(400).send({ success: false, msg: 'Please fill in all the required fields!' })
    } else {
        log = Log.create({// we could remove this and put it in a new function with await->async!

        })
            .then((log) => {
                Message.create({
                    id: uuid.v1(),
                    name: req.body.name,
                    logId: log.id,
                    message: req.body.message
                })
                    .then((message) => res.status(201).send({ success: true, msg: message }))
                    .catch((error) => res.status(400).send({ success: false, msg: error }));
            })
            .catch((error) => res.status(400).send({ success: false, msg: error }));

    }
})

router.get('/getMessage', function (req, res) {//get all message
    Message.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
    })
        .then((message) => {
            if (message.length > 0) {
                res.status(200).send({ success: true, msg: message })
            } else {
                res.status(400).send({ success: false, msg: "No message found!" })
            }
        })
        .catch((error) => res.status(400).send({ success: false, msg: error }))
})

router.get('/set_max_age/:second', function (req, res) {
    if (!req.params.second) {
        res.status(400).send({ success: false, msg: 'Please fill max age' })
    } else {
        const currentTime = Math.floor(new Date().getTime() / 1000);
        const removeMySec = new Date((currentTime - req.params.second) * 1000).toISOString();
        //console.log(removeMySec)
        Log.findAll({
            where: {
                createdAt:{ [Op.gte]:removeMySec }
            }
        })
        .then((log) => {
            if (log.length > 0) {
                res.status(200).send({ success: true, msg: log })
            } else {
                res.status(400).send({ success: false, msg: "No log found!" })
            }
        })
        .catch((error) => res.status(400).send({ success: false, msg: error }))
    }
})


//Finally, export the router as a module.
module.exports = router;