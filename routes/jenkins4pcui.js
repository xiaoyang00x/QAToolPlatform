var jenkinsapi = require('jenkins-api');
var express = require('express');
var router = express.Router();
var JenkinsTask = require('../models/jenkinsTask.js');
var jenkinsTaskDao = require('../dao/jenkinsTaskDao');
var autotaskDao = require('../dao/autotaskDao');

var jenkins = jenkinsapi.init("http://yangyutest:yangyutest@10.4.238.10:8080");


//GET /signin 登录页
router.get('/', function (req, res, next) {
    res.render('home');
});

router.get('/getAllPCUITask', function (req, res, next) {
    jenkinsTaskDao.findAllPcTask(function (err, result) {
        res.json(result);
    });
});


router.post('/deletePCUITask', function (req, res, next) {
    var AssociationID = req.fields.AssociationID;
    console.log("进来了----------AssociationID" + AssociationID);
    jenkinsTaskDao.del({"associationID": AssociationID})
        .then(function (data) {
            console.log("AssociationID JenkinsTask 删除成功");
            return autotaskDao.del({"associationID": AssociationID})
        })
        .then(function (data) {
            console.log("AssociationID autoTask 删除成功");
            res.json(data);
        })
        .catch(function (reason) {
            console.log('rejected');
            console.log(reason);
        })
});


router.post('/', function (req, res, next) {

    console.log("进来这个方法了1234");
    var TestName = req.fields.TestName;
    var Broswertype = req.fields.Broswertype;
    var AssociationID = req.fields.AssociationID;
    var Status = req.fields.Status;
    var Time = req.fields.Time;
    var queryCountTime = new Date();

    var JenkinsTaskInstance = new JenkinsTask({
        'testname': TestName,
        'broswertype': Broswertype,
        'status': Status,
        'associationID': AssociationID,
        'createtime': Time,
        'pass': 0,//默认是0
        'fail': 0,//默认是0
        'queryCountTime': queryCountTime,
        'deviceType': 'pc'
    });

    jenkins.build('H5AutomationTest4system', {
        deviceType: 'pc',
        testName: TestName,
        isVideo: 'false',
        broswerType: Broswertype,
        isLocalVideo: 'false',
        associationID: AssociationID
    }, function (err, data) {
        console.log(data);
        if (err) {
            return console.log(err);
        } else {
            console.log("请求成功:------------------- " + data);
            jenkinsTaskDao.insert(JenkinsTaskInstance, function (err, result) {
                res.json(data);
            });
        }
    });
});

module.exports = router;

console.log(new Date());