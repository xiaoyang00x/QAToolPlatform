var sha1 = require('sha1');
var express = require('express');
var router = express.Router();
var HttpUtils = require('./HttpUtils.js');
var Request = require('../models/request.js');
var requestDao = require('../dao/requestDao');



// GET /signin 登录页
router.get('/', function(req, res, next) {
  res.render('postman');
});

router.post('/', function(req, res, next) {
  res.render('postman');
});


router.get('/getAllInterfaceList', function(req, res, next) {
      requestDao.findAllInterFace(function(err,result){
         res.json(result);
      })
});


    /**
    * 保存接口
    * 
    */

router.post('/save', function(req, res, next) {
  console.log("/getResult");
  var token4request = req.fields.token4request;
  var URL = req.fields.URL;
  var body = req.fields.body;
  var interfaceName = req.fields.interfaceName;
  var method =   req.fields.method;
  
    // 待写入数据库的用户信息
  var request = new Request({
    'interfaceName': interfaceName,
    'token4request': token4request,
    'URL':URL,
    'method': method,
    'body': body
  });

  requestDao.findOneAndRemove({'interfaceName':interfaceName},function(err,res){
    requestDao.insert(request,function(err,result){

    })
  });
    req.flash('success', '保存成功');
    HttpUtils.postFormJson(URL,token4request,body,method,function (result) {
        res.json(result);
  });

});


    /**
    * 获取接口通过名字
    * 
    */
router.post('/deleteInterface', function(req, res, next) {
      console.log("deleteInterface");
      req.flash('success', '删除成功');
      var interfaceName = req.fields.interfaceName;
      requestDao.findOneAndRemove({'interfaceName':interfaceName},function(err,result){
         res.json(result);
      })
});




    /**
    * 获取接口通过名字
    * 
    */
router.post('/getAllInterfaceByName', function(req, res, next) {
      console.log("getAllInterfaceByName进来了");
      var interfaceName = req.fields.interfaceName;
      requestDao.getByConditions({'interfaceName':interfaceName},function(err,result){
         res.json(result);
      })
});


  
    /**
    * 获取token
    * 
    */
router.post('/getToken', function(req, res, next) {
  console.log("/getToken进来了");
  var username = req.fields.username;
  var password = req.fields.password
  var param = "mobilePhone="+username+"&password="+password+"&timer=1488349673150";
  HttpUtils.postForm('https://api.shicaidai.com/userService/login',"", param, function (result) {
        res.json(result);
  });
});



    /**
    * 获取请求结果
    * 
    */
router.post('/getResult', function(req, res, next) {
  console.log("/getResult");
  var token4request = req.fields.token4request;
  var URL = req.fields.URL;
  var body = req.fields.body;
  var interfaceName = req.fields.interfaceName;
  var method =   req.fields.method;
  

    // 待写入数据库的用户信息
  var request = new Request({
    'interfaceName': interfaceName,
    'token4request': token4request,
    'URL':URL,
    'method': method,
    'body': body
  });

  // requestDao.findOneAndRemove({'interfaceName':interfaceName},function(err,res){
  //   console.log("res--------------------" + res);
  //   console.log("开始插入");
  //   requestDao.insert(request,function(err,res){console.log('插入结束')})
  // });

  HttpUtils.postFormJson(URL,token4request,body,method,function (result) {
        res.json(result);
  });
});

module.exports = router;