var fs = require('fs');
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');
var UserDao = require('../dao/userDao');
//var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signup 注册页
router.get('/', function (req, res, next) {
    console.log("进到这里面了-------------");
    res.render('signup');

});

// POST /signup 用户注册
router.post('/', function (req, res, next) {
    console.log("进入注册了");
    console.log(req.fields);

    var name = req.fields.fullname;
    var password = req.fields.password;
    var passwordconfirm = req.fields.passwordconfirm;
    var nickName = req.fields.nickname;
    var email = req.fields.email;
    var phoneNumber = req.fields.phonenum;
    var role = req.fields.admin;
    password = sha1(password);

    // 待写入数据库的用户信息
    var user = new UserModel({
        'name': name,
        'password': password,
        'nickName': nickName,
        'email': email,
        'phoneNumber': phoneNumber,
        'role': role
    });

    // 用户信息写入数据库
    UserDao.getByConditions({'name': name}, function (err, result) {
        console.log("getByConditions result: " + result);
        if (result.length != 0) {
            res.json(result);
        } else {
            UserDao.insert(user, function (err, result) {
                if (err) {
                    console.log('err : ' + err);
                    res.render('signup');
                    next(err);
                } else {
                    delete user.password;
                    res.json('注册成功');
                }
            });
        }
    });

});

module.exports = router;
