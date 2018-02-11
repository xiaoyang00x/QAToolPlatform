var jenkinsapi = require('jenkins-api');
var express = require('express');
var router = express.Router();
var JenkinsTask = require('../models/jenkinsTask.js');
var jenkinsTaskDao = require('../dao/jenkinsTaskDao');
var autotaskDao = require('../dao/autotaskDao');
var logger = require('../index').logger('jenkins4pcui');
var jenkins = jenkinsapi.init("http://yangyu:yangyu@10.5.233.3:8080");


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
    logger.info("***********************start**************************");
    logger.info("*************************************************");
    logger.info("进来了----------AssociationID : " + AssociationID);
    jenkinsTaskDao.del({"associationID": AssociationID})
        .then(function (data) {
            logger.info("AssociationID : "+AssociationID +" 的autoTask 正在删除");
            return autotaskDao.del({"associationID": AssociationID})
        })
        .then(function (data) {
            logger.info("AssociationID : "+AssociationID +" 的autoTask 删除成功");
            logger.info("*************************************************");
            logger.info("***********************end**************************");
            res.json(data);
        })
        .catch(function (reason) {
            logger.info('rejected');
            logger.error(reason);
        })
});


router.post('/', function (req, res, next) {

    logger.info("***********************start**************************");
    logger.info("*************************************************");
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

    jenkins.build('AutomationTestJob', {
        deviceType: 'pc',
        testName: TestName,
        isVideo: 'false',
        broswerType: Broswertype,
        isLocalVideo: 'false',
        associationID: AssociationID
    }, function (err, data) {
        logger.info(data);
        if (err) {
            return logger.error(err);
        } else {
            logger.info("请求成功:------------------- " + data);
            jenkinsTaskDao.insert(JenkinsTaskInstance, function (err, result) {
                res.json(data);
                logger.info("*************************************************");
                logger.info("***********************end**************************");
            });
        }
    });
});

module.exports = router;

console.log(new Date());