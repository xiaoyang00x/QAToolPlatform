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
  },


  findAllPcTask: function find(callback){
      JenkinsPCTask.find({}).sort({'_id':-1}).exec(function(err,res){
          if (err) {
              console.log("Error:" + err);
              callback(err,null);
          }
          else {
              console.log("Res:" + res);
              console.log("查询成功");
              callback(null,res);
          }
      })
   }
}
