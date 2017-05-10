var sha1 = require('sha1');
var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');
var UserDao = require('../dao/userDao');
var redis = require("redis");
var client = require("../lib/redis").createClient();
require('date-utils');
var tomorrow = Date.tomorrow();
var date = new Date();

//var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signin 登录页
router.get('/', function (req, res, next) {
    if (req.session.user) {
        console.log("有session : " + req.session.user.name);
        res.redirect('/home');
    }
    else {
        console.log("没有session");
        res.render('login');
    }
    //res.send(req.flash());
});


// POST /signin 用户登录
router.post('/', function (req, res, next) {

    var name = req.fields.name;
    var password = req.fields.password;

    console.log('进来了-----------name : ' + name + "------password:---" + password);

    // 待写入数据库的用户信息
    var user = new UserModel({
        'name': name,
        'password': password,
    });


    password = sha1(password);
    console.log(password);
    UserDao.getByConditions({'name': name, 'password': password}, function (err, result) {
        if (result.length == 0) {
            console.log("密码错误了");
            req.flash('error', '用户名或密码错误');
            return res.redirect('/signin');
        } else {
            console.log("密码正确");
            delete user.password;
            req.session.user = user;

            // 每次有用户登陆的时候，都用redis来记录总的登陆总次数。
            client.get("accessAmount", function (err, result) {
                if (result === null || result === undefined) {
                    client.set("accessAmount", 40, redis.print);
                } else {
                    client.get("accessAmount", function (error, result) {
                        if (error) {
                            console.log(error);
                        } else {
                            result++;
                            client.set("accessAmount", result, function (error, data) {
                                if (error) {
                                    console.log(error);
                                }
                            })
                        }
                    })
                }
            });

            // 每次有用户登陆的时候，都用redis来记录总的今日的登陆总次数。
            client.get("accessAmountToday", function (err, result) {
                if (result === null || result === undefined) {
                    console.log("Still have " + date.getSecondsBetween(tomorrow) + " seconds to go before tomorrow.");
                    client.set("accessAmountToday", 1, "EX", date.getSecondsBetween(tomorrow));
                } else {
                    client.get("accessAmountToday", function (error, result) {
                        if (error) {
                            console.log(error);
                        } else {
                            result++;
                            client.set("accessAmountToday", result, "EX", date.getSecondsBetween(tomorrow), function (error, data) {
                                if (error) {
                                    console.log(error);
                                }
                            })
                        }
                    })
                }
            });
            return res.redirect('/home');
        }
    });


});

module.exports = router;