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
  HttpUtils.postFormJson('https://api.shicaidai.com/userService/login',"", param, function (result) {
        res.json(result);
  });
});

module.exports = router;