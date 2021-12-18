const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
//const axios = require('axios')
//const cheerio = require('cheerio')
require('../config/passport')(passport);
const Message = require('../models').Message;
const Log = require('../models').Log;
const MaxAge = require('../models').MaxAge;

const uuid = require('uuid'); //generate time based random number
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");
const { get } = require('http');

router.post('/maxAge', function (req, res) {//set max age limit
    if (!req.body.limit) {
        res.status(400).send({ success: false, msg: 'Please fill maximum age limit!' })
    } else {
        maxLimit = MaxAge.findAll({//preventing multiple maxAge
            where: {

            }
        })
            .then((maxLimit) => {
                if (maxLimit.length == 0) {
                    MaxAge.create({
                        id: uuid.v1(),
                        maxAge: req.body.limit
                    })
                        .then((maxAge) => { res.status(201).send({ success: true, msg: maxAge }) })
                        .catch((error) => res.status(400).send({ success: false, msg: error }));
                } else {
                    res.status(400).send({ success: false, msg: "Not allowed to create multiple max age!" })
                }
            })
    }
})
router.put('/updateMaxAge', function (req, res) {//set max age limit
    if (!req.body.limit) {
        res.status(400).send({ success: false, msg: 'Please fill maximum age limit!' })
    } else {
        MaxAge.update({
            maxAge: req.body.limit
        },
            {
                returning: true, where: {}
            })
            .then((maxAge) => {
                if (maxAge[0] > 0) {
                    res.status(201).send({ success: true, msg: maxAge })
                } else {
                    res.status(400).send({ success: false, msg: "No max age created yet!" })
                }
            })
            .catch((error) => res.status(400).send({ success: false, msg: error }));
    }
})

router.get('/getMaxAge', function (req, res) {//getting max age
    MaxAge.findOne({
        where: {

        }
    })
        .then((maxAge) => {
            console.log(maxAge)
            if (maxAge) {
                res.status(200).send({ success: true, msg: maxAge })
            } else {
                res.status(400).send({ success: false, msg: "No max age created yet!" })
            }
        })
        .catch((error) => res.status(400).send({ success: false, msg: error }))
})

router.get('/getLog', function (req, res) {//get all logs
    Log.findAll({
        where: {

        }
    })
        .then((logs) => { res.status(200).send({ success: true, msg: logs }) })
        .catch((error) => res.status(400).send({ success: false, msg: error }))
})

router.post('/addMessage', function (req, res) { //create message

    if (!req.body.name || !req.body.message) {
        res.status(400).send({ success: false, msg: 'Please fill in all the required fields!' })
    } else {
        let logId = 0
        Log.findOne({//checking if old log exist
            where: {
                createdAt: { [Op.lt]: new Date() }
            }
        })
            .then((logOld) => {
                if (logOld) {
                    logId = logOld.id
                } else { // old log does not exist, create new log
                    Log.create({// we could remove this and put it in a new function with await->async!

                    })
                        .then(newLog => {
                            logId = newLog.id
                        })
                }
                Message.create({
                    id: uuid.v1(),
                    name: req.body.name,
                    logId: logId,
                    message: req.body.message
                })
                    .then((message) => res.status(201).send({ success: true, msg: message }))
                    .catch((error) => res.status(400).send({ success: false, msg: error }));
            })
            .catch((error) => res.status(400).send({ success: false, msg: error }));

        /* log = Log.create({// we could remove this and put it in a new function with await->async!
            where:{
                createdAt:{[Op.gte]:new Date()}
            }
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
            .catch((error) => res.status(400).send({ success: false, msg: error })); */

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
        let allMessage = []
        Log.findAll({
            where: {
                createdAt: { [Op.gte]: removeMySec }
            }
        })
            .then((log) => {
                if (log.length > 0) {
                    for (let i = 0; i < log.length; i++) {
                        Message.findAll({
                            where: {
                                logId: log[i].id
                            }
                        })
                            .then(msg => {
                                if (msg.length > 0) {
                                    allMessage.push(msg);
                                }
                                res.status(200).send({ success: true, msg: allMessage })
                            })
                    }
                } else {
                    res.status(400).send({ success: false, msg: "No log found!" })
                }
            })
            .catch((error) => res.status(400).send({ success: false, msg: error }))
    }
})

router.delete('/removeMsg', function (req, res) { //

    MaxAge.findOne({

    })
        .then(second => {
            const currentTime = Math.floor(new Date().getTime() / 1000);
            const removeMySec = new Date((currentTime - second.maxAge) * 1000).toISOString();
            Message
                .destroy({
                    returning: true,
                    where: {
                        createdAt: { [Op.lte]: removeMySec }
                    }
                })
                .then((removeMsg) => res.status(200).send({ success: true, msg: "Successfully deleted!" }))
                .catch((error) => res.status(400).send(error));
        })

})


//Finally, export the router as a module.
module.exports = router;