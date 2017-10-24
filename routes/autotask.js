var express = require('express');
var router = express.Router();
var autotaskDao = require('../dao/autotaskDao');



// GET /pcui 页面
router.get('/', function(req, res, next) {
    //res.send(req.flash());
     if(req.session.user)
    	res.render('autotask');
     else
      	res.redirect('/signin');

});








router.post('/getAutotaskByID', function(req, res, next) {
    var AssociationID = req.fields.AssociationID;
    console.log("进来了----------AssociationID" + AssociationID);
    autotaskDao.getByConditions({'associationID':AssociationID})
    .then(function(data){
    	 res.json(data);
    })
  	.catch(function(reason){
		console.log(reason);
  	})


});


// // POST /pcui 用户登录
// router.post('/', function(req, res, next) {});

module.exports = router;