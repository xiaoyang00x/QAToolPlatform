var sha1 = require('sha1');
var express = require('express');
var router = express.Router();
var HttpUtils = require('./HttpUtils.js');
var Request = require('../models/request.js');
var requestDao = require('../dao/requestDao');
var config = require('config-lite');


// GET /signin 登录页
router.get('/', function (req, res, next) {
    if (req.session.user) {
        console.log("有session : " + req.session.user.name);
        res.render('postman');
    }
    else {
        console.log("没有session");
        res.render('login');
    }
});

router.post('/', function (req, res, next) {
    res.render('postman');
});


router.get('/getAllInterfaceList', function (req, res, next) {
    requestDao.findAllInterFace()
        .then(function (result) {
            return res.send(result);
        })
        .catch(function (reason) {
            console.log(reason);
        })
});

/**
 * 保存接口
 *
 */

router.post('/save', function (req, res, next) {
    console.log("/getResult");
    var token4request = req.fields.token4request;
    var URL = req.fields.URL;
    var body = req.fields.body;
    var interfaceName = req.fields.interfaceName;
    var method = req.fields.method;

    // 待写入数据库的用户信息
    var request = new Request({
        'interfaceName': interfaceName,
        'token4request': token4request,
        'URL': URL,
        'method': method,
        'body': body
    });

    requestDao.findOneAndRemove({'interfaceName': interfaceName})
        .then(function (result) {
            return requestDao.insert(request)
        }).then(function (result) {
        req.flash('success', '保存成功');
        res.send(result);
    }).catch(function (reason) {
        console.log(reason);
    })
});


/**
 * 获取接口通过名字
 *
 */
router.post('/deleteInterface', function (req, res, next) {
    var interfaceName = req.fields.interfaceName;
    requestDao.findOneAndRemove({'interfaceName': interfaceName})
        .then(function (result) {
            req.flash('success', '删除成功');
            return res.send(result);
        })
        .catch(function (reason) {
            console.log(reason);
        })
});


/**
 * 获取接口通过名字
 *
 */
router.post('/getAllInterfaceByName', function (req, res, next) {
    console.log("getAllInterfaceByName进来了");
    var interfaceName = req.fields.interfaceName;
    requestDao.getByConditions({'interfaceName': interfaceName})
        .then(function (result) {
                return res.send(result);
            }
        )
        .catch(function (reason) {
            console.log(reason);
        })

});


/**
 * 获取token
 *
 */
router.post('/getToken', function (req, res, next) {
    console.log("/getToken进来了");
    var username = req.fields.username;
    var password = req.fields.password
    var param = "mobilePhone=" + username + "&password=" + password + "&timer=1488349673150";
    console.log("---------------"+param);
    HttpUtils.postForm(config.loginURL + '/user/login', "", param)
        .then(function (result) {
            console.log(JSON.stringify(result));
            res.send(result);
        }).catch(function (reason) {
        console.log(reason);
    })
});


/**
 * 获取请求结果
 *
 */
router.post('/getResult', function (req, res, next) {
    console.log("/getResult");
    var token4request = req.fields.token4request;
    var URL = req.fields.URL;
    var body = req.fields.body;
    var interfaceName = req.fields.interfaceName;
    var method = req.fields.method;


    // 待写入数据库的用户信息
    var request = new Request({
        'interfaceName': interfaceName,
        'token4request': token4request,
        'URL': URL,
        'method': method,
        'body': body
    });
    console.log("/getResult-------:"+request)
    HttpUtils.postFormJson(URL, token4request, body, method).then(function (result) {
        console.log(JSON.stringify("!!!!!!!!!"+result));
        res.send(result);
    }).catch(function (reason) {
        res.send("300");
    })
});

module.exports = router;