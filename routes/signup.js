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
    var name = req.fields.name;
    var password = req.fields.password;
    //var repassword = req.fields.repassword;
    console.log("进入注册了 用户名是" + name + "密码是" + password);
    // 校验参数
    try {
        if (!(name.length >= 1 && name.length <= 16)) {
            throw new Error('名字请限制在 1-16 个字符');
        }
        if (password.length < 6) {
            throw new Error('密码至少 6 个字符');
        }
        // if (password !== repassword) {
        //   throw new Error('两次输入密码不一致');
        // }
    } catch (e) {
        // 注册失败，异步删除上传的头像
        req.flash('error', e.message);
        return res.redirect('/signin');
    }

    // 明文密码加密
    password = sha1(password);

    // 待写入数据库的用户信息
    var user = new UserModel({
        'name': name,
        'password': password,
    });


    // 用户信息写入数据库
    UserDao.getByConditions({'name': name}, function (err, result) {
        console.log("getByConditions result: " + result);
        if (result.length != 0) {
            req.flash('error', '用户名已被占用');
            return res.redirect('/signin');
        } else {
            UserDao.insert(user, function (err, result) {
                if (err) {
                    console.log('err : ' + err);
                    req.flash('error', err);
                    return res.redirect('/signin');
                    next(err);
                } else {
                    req.flash('success', '注册成功');
                    delete user.password;
                    req.session.user = user;
                    res.redirect('/signin');
                }
            });
        }
    });

});

module.exports = router;
