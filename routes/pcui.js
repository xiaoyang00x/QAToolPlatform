var express = require('express');
var router = express.Router();



// GET /pcui 页面
router.get('/', function(req, res, next) {
    //res.send(req.flash());
     if(req.session.user!=null)
    	res.render('pcui');
     else
      	res.redirect('/signin');


});

// // POST /pcui 用户登录
// router.post('/', function(req, res, next) {});

module.exports = router;