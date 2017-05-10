var express = require('express');
var router = express.Router();

//var checkLogin = require('../middlewares/check').checkLogin;

// GET /signout 登出
router.get('/', function(req, res, next) {
  if(req.session.user!=null){
  	  // 清空 session 中用户信息
	  req.session.user = null;
      var target  = req.session.id;
      // 登出成功后跳转到主页
	  req.flash('success', '登出成功');
	  // 销毁session
      req.session.destroy(target, function (error) {
          if(error){
              console.log(error);
          }
      });
	}

	res.redirect('/signin');

});

module.exports = router;