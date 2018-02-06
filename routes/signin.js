var sha1 = require('sha1');
var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');
var UserDao = require('../dao/userDao');
require('date-utils');
var date = new Date();
var tomorrow = Date.tomorrow();




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
    password = sha1(password);
    UserDao.getByConditions({'name': name, 'password': password}, function (err, result) {
        if (result.length == 0) {
            res.redirect('/signin');
        } else {
            console.log("密码正确");
            req.session.user = result[0];
            return res.redirect('/home');
        }
    });

});

module.exports = router;