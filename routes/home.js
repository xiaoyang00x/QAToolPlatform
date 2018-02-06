var express = require('express');
var router = express.Router();
var jenkinsTaskDao = require("../dao/jenkinsTaskDao");


// GET /signin 登录页
router.get('/', function (req, res, next) {

    if (req.session.user) {
        console.log("/sign进来了")
        res.render('homePage');
    } else {
        res.redirect('/signin');

    }
});

// POST /signin 用户登录
router.post('/', function (req, res, next) {
});


// POST  获取折线case数
router.post('/getLineChart', function (req, res, next) {
    var deviceType = req.fields.deviceType;
    console.log("进到/getLineChart了");
    jenkinsTaskDao.getLineChart(new Date().getFullYear(), deviceType)
        .then(function (result) {
            return res.send(result);
        }).catch(function (reason) {
        console.log("/getLineChart报异常了");
        console.log(reason);
    })

});


// POST  获取所有case数
router.post('/initTestCaseCount', function (req, res, next) {
    console.log("进到/initTestCaseCount");
    jenkinsTaskDao.initTestCaseCount()
        .then(function (result) {
            return res.send(result);
        }).catch(function (reason) {
        console.log("/initTestCaseCount报异常了");
        console.log(reason);
    })
});


// POST  获取所有pass case数
router.post('/getPassTestCaseCount', function (req, res, next) {
    console.log("进到/getPassTestCaseCount");
    jenkinsTaskDao.getPassTestCaseCount()
        .then(function (result) {
            return res.send(result);
        }).catch(function (reason) {
        console.log("/getPassTestCaseCount报异常了");
        console.log(reason);
    })
});


// POST  获取所有passcase数
router.post('/initTestCasePassCount', function (req, res, next) {
    console.log("进到/initTestCasePassCount");
    jenkinsTaskDao.initTestCasePassCount()
        .then(function (result) {
            return res.send(result);
        }).catch(function (reason) {
        console.log("/initTestCasePassCount报异常了");
        console.log(reason);
    })
});


module.exports = router;