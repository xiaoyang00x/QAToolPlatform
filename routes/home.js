var express = require('express');
var router = express.Router();
var accessAmountDao = require("../dao/accessAmountDao");


// GET /signin 登录页
router.get('/', function (req, res, next) {

    if (req.session.user !== null) {
        let accessAmountAll = 0;
        accessAmountDao.getAccessAmount("accessAmount").then(function (data) {
            accessAmountAll = data;
            return accessAmountDao.getAccessAmount("accessAmountToday");
        }).then(function (todayData) {
            res.render('homePage', {"accessAmountToday": todayData, "accessAmount": accessAmountAll});
        }).catch(function (error) {
            console.log("Get redis error: " + error);
        });

    } else {
        res.redirect('/signin');

    }
});

// POST /signin 用户登录
router.post('/', function (req, res, next) {
});

module.exports = router;