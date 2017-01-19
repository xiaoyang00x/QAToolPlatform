var sha1 = require('sha1');
var express = require('express');
var router = express.Router();
var UserModel = require('../models/users2');
var UserDao = require('../dao/userDao');

//var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signin 登录页
router.get('/', function(req, res, next) {
	  res.render('login');
  //res.send(req.flash());
});

// POST /signin 用户登录
router.post('/', function(req, res, next) {


  var name = req.fields.name;
  var password = req.fields.password;
  password = sha1(password);
  UserDao.getByConditions({'name':name,'password':password},function(err,result){
  		if(result.length==0){
  			req.flash('error', '用户名或密码错误');
      		return res.redirect('/signin');
  		}else{
			return res.redirect('/home');
  		}
  });
});

module.exports = router;