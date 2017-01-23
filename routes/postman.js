/**
 * Created by manny on 2017/1/22.
 */
var http = require('http');
var https = require('https');
var express = require('express');
var router = express.Router();



router.get('/', function (req, res, next) {
    res.render('postman');
});

module.exports = router;