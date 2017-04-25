var sha1 = require('sha1');
var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');
var UserDao = require('../dao/userDao');

//var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signin 登录页
router.get('/', function(req, res, next) {
    if(req.session.user){
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
router.post('/', function(req, res, next) {

  var name = req.fields.name;
  var password = req.fields.password;

  console.log('进来了-----------name : '+name +"------password:---"+password);

  // 待写入数据库的用户信息
  var user = new UserModel({
    'name': name,
    'password': password,
  });


  password = sha1(password);
  console.log(password);
  UserDao.getByConditions({'name':name,'password':password},function(err,result){
  		if(result.length==0){
        console.log("密码错误了");
  			req.flash('error', '用户名或密码错误');
      		return res.redirect('/signin');
  		}else{
          console.log("密码正确");
          delete user.password;
          req.session.user = user;
	      	return res.redirect('/home');
  		}
  });
});

module.exports = router;