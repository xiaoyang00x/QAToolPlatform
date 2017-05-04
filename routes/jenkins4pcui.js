var jenkinsapi = require('jenkins-api');
var express = require('express');
var router = express.Router();
var JenkinsPCTask = require('../models/jenkinsPCTask.js');
var jenkinsPCTaskDao = require('../dao/jenkinsPCTaskDao');

var jenkins = jenkinsapi.init("http://xiaoyang00x:xiaoyang00x@172.18.0.53:9999");



//GET /signin 登录页
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/', function(req, res, next) {
  //res.render('postman');
});





router.post('/', function(req, res, next) {

    var TestName = req.fields.TestName;
    var Broswertype = req.fields.Broswertype;
    var AssociationID = req.fields.AssociationID;
    var Status = req.fields.Status;
    var Time = req.fields.Time;

    var jenkinsPCTask = new JenkinsPCTask({
    	'testname':TestName,
    	'broswertype':Broswertype,
    	'status':Status,
    	'associationID':AssociationID,
    	'createtime':Time
    });
  
	jenkins.build('H5AutomationTest4system', {deviceType: 'pc',testName:TestName,isVideo:'false',broswerType:Broswertype,isLocalVideo:'false',associationID:AssociationID}, function(err, data) {
	  if (err){ 
	  	return console.log(err); 
	  }else{
	  	  console.log("请求成功:------------------- " + data);
	  	  jenkinsPCTaskDao.insert(jenkinsPCTask,function(err, result){
				res.json(data);	  	  	
	  	  });
	   }
	});
});

module.exports = router;