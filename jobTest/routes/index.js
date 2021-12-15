const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const axios = require("axios");
const Message = require('../models').Message;
const Log = require('../models').Log;
const MaxAge = require('../models').MaxAge;

/* GET home page. */
router.get("/", asyncHandler(async (req, res) => {

  try {
    const logs = await axios({
      url: `${process.env.URL}:${process.env.PORT}/api/v2/getLog`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const maxAge = await axios({
      url: `${process.env.URL}:${process.env.PORT}/api/v2/getMaxAge`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const messages = await axios({
      url: `${process.env.URL}:${process.env.PORT}/api/v2/getMessage`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.json({
      success: true,
      totalLog: logs.data.msg.length,
      maxAges: maxAge.data.msg.maxAge,
      totalMessage: messages.data.msg.length
    });
  } catch (err) {
    res.json({
      success: false,
      error: err
    });
  }

  /* MaxAge.findOne({
    where: {

    }
  })
    .then(maxAgeLimit => {
      Log.findAll({
        where: {

        }
      })
        .then((logs) => {
          Message.findAll({
            where: {

            }
          })
            .then((messages) => {
              res.json({
                success: true,
                totalLog: logs.length,                
                maxAges: maxAgeLimit.maxAge,
                totalMessage:messages.length
              });
            })
        })
    }) */
  //res.render('index', { title: 'Express' });
}));

module.exports = router;
