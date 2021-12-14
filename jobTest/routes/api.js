const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
//const axios = require('axios')
//const cheerio = require('cheerio')
require('../config/passport')(passport);
const Info = require('../models').Info;

const uuid = require('uuid'); //generate time based random number
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");
const { get } = require('http');

router.get('/getLog', function (req, res) {
    console.log('i am here---------------------')
})

//Finally, export the router as a module.
module.exports = router;