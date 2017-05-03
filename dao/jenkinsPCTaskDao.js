var JenkinsPCTask = require('../models/jenkinsPCTask.js');



module.exports = {

    /**
    * 插入
    * user : User模型对象
    */
    insert: function insert(jenkinsPCTask,callback) {
      jenkinsPCTask.save(function (err, res) {
          if (err) {
              console.log("Error:" + err);
              callback(err,null);
          }
          else {
              console.log("Res:" + res);
              console.log("插入成功了");
              callback(null,res);
          }
      });
  },


    /**
    * 更新
    * wherestr : 查询条件
    * updatestr： 更新条件
    */
    update: function update(wherestr,updatestr,callback){
      JenkinsPCTask.update(wherestr, updatestr, function(err, res){
          if (err) {
              console.log("Error:" + err);
              callback(err,null);
          }
          else {
              console.log("Res:" + res);
              console.log("更新成功了");
              callback(null,res);
          }
      })
  }

}


// var jenkinsPCTaskDao = require("./jenkinsPCTaskDao")
// var jenkinsPCTask = new JenkinsPCTask({'testcase': '*',
//                      'status' : '1',
//                     'broswer':'chrome',
//                     'pass':'1',
//                     'fail':'1',
//                     'associationID':'a'});

// jenkinsPCTaskDao.insert(jenkinsPCTask,function(err,res){
//   console.log(res);
// });


// var jenkinsPCTask = new JenkinsPCTask({'testcase': '*',
//                      'status' : '1',
//                     'broswer':'chrome',
//                     'pass':'1',
//                     'fail':'1',
//                     'associationID':'b'});

// jenkinsPCTaskDao.insert(jenkinsPCTask,function(err,res){
//   console.log(res);
// });


// var jenkinsPCTask = new JenkinsPCTask({'testcase': '*',
//                      'status' : '1',
//                     'broswer':'chrome',
//                     'pass':'1',
//                     'fail':'1',
//                     'associationID':'c'});

// jenkinsPCTaskDao.insert(jenkinsPCTask,function(err,res){
//   console.log(res);
// });


// var jenkinsPCTask = new JenkinsPCTask({'testcase': '*',
//                      'status' : '1',
//                     'broswer':'chrome',
//                     'pass':'1',
//                     'fail':'1',
//                     'associationID':'d'});

// jenkinsPCTaskDao.insert(jenkinsPCTask,function(err,res){
//   console.log(res);
// });


// var jenkinsPCTask = new JenkinsPCTask({'testcase': '*',
//                      'status' : '1',
//                     'broswer':'chrome',
//                     'pass':'1',
//                     'fail':'1',
//                     'associationID':'e'});

// jenkinsPCTaskDao.insert(jenkinsPCTask,function(err,res){
//   console.log(res);
// });




// jenkinsPCTaskDao.update({associationID:'yangyuwudi'},{pass:'18',fail:'19',status:'Done'},function(err,res){
//   console.log(res);
// })


// var jenkinsPCTaskDao = require("./jenkinsPCTaskDao")
// var jenkinsPCTask = new JenkinsPCTask({'testcase': '*',
//                      'status' : '1',
//                     'broswer':'chrome',
//                     'pass':'1',
//                     'fail':'1',
//                     'associationID':'f'});

// jenkinsPCTaskDao.insert(jenkinsPCTask,function(err,res){
//   console.log(res);
// });


// var jenkinsPCTask = new JenkinsPCTask({'testcase': '*',
//                      'status' : '1',
//                     'broswer':'chrome',
//                     'pass':'1',
//                     'fail':'1',
//                     'associationID':'g'});

// jenkinsPCTaskDao.insert(jenkinsPCTask,function(err,res){
//   console.log(res);
// });


// var jenkinsPCTask = new JenkinsPCTask({'testcase': '*',
//                      'status' : '1',
//                     'broswer':'chrome',
//                     'pass':'1',
//                     'fail':'1',
//                     'associationID':'h'});

// jenkinsPCTaskDao.insert(jenkinsPCTask,function(err,res){
//   console.log(res);
// });


// var jenkinsPCTask = new JenkinsPCTask({'testcase': '*',
//                      'status' : '1',
//                     'broswer':'chrome',
//                     'pass':'1',
//                     'fail':'1',
//                     'associationID':'i'});

// jenkinsPCTaskDao.insert(jenkinsPCTask,function(err,res){
//   console.log(res);
// });


// var jenkinsPCTask = new JenkinsPCTask({'testcase': '*',
//                      'status' : '1',
//                     'broswer':'chrome',
//                     'pass':'1',
//                     'fail':'1',
//                     'associationID':'j'});

// jenkinsPCTaskDao.insert(jenkinsPCTask,function(err,res){
//   console.log(res);
// });




// jenkinsPCTaskDao.update({associationID:'yangyuwudi'},{pass:'18',fail:'19',status:'Done'},function(err,res){
//   console.log(res);
// })
