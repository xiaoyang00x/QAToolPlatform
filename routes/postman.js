var sha1 = require('sha1');
var express = require('express');
var router = express.Router();
var HttpUtils = require('./HttpUtils.js');

// GET /signin 登录页
router.get('/', function(req, res, next) {
  res.render('postman');
});

router.post('/', function(req, res, next) {
  res.render('postman');
});


router.post('/getToken', function(req, res, next) {
  console.log("/getToken进来了");
  var username = req.fields.username;
  var password = req.fields.password
  var param = "mobilePhone="+username+"&password="+password+"&timer=1488349673150";
  HttpUtils.postForm('https://api.shicaidai.com/userService/login',"", param, function (result) {
        res.json(result);
  });
});


router.post('/getResult', function(req, res, next) {
  console.log("/getResult");
  var token4request = req.fields.token4request;
  var URL = req.fields.URL;
  var body = req.fields.body;
  var interfaceName = req.fields.interfaceName;
  var method =   req.fields.method;
  HttpUtils.postFormJson(URL,token4request,body,method,function (result) {
        res.json(result);
  });
});

module.exports = router;