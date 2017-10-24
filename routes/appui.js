var express = require('express');
var router = express.Router();



// GET /appui 页面
router.get('/', function(req, res, next) {
    //res.send(req.flash());
     if(req.session.user)
    	res.render('appui');
     else
      	res.redirect('/signin');


});

// // POST /appui 用户登录
// router.post('/', function(req, res, next) {});

module.exports = router;