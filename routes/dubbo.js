var express = require('express');
var router = express.Router();



// GET /dubbo 页面
router.get('/', function(req, res, next) {
    //res.send(req.flash());
    if(req.session.user!=null)
        res.render('dubbo');
    else
        res.redirect('/signin');

});

// // POST /dubbo 用户登录
// router.post('/', function(req, res, next) {});

module.exports = router;