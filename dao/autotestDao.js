var Autotest = require('../models/autotest.js');
module.exports = {

    /**
    * 插入
    * user : User模型对象
    */
    insert: function insert(autotest,callback) {
      autotest.save(function (err, res) {
          if (err) {
              console.log("Error:" + err);
              console.log("")
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
    * 通过属性删除数据
    * wherestr : 属性条件
    */
    del: function del(wherestr){

        var p = new Promise(function(resolve, reject){

          Autotest.remove(wherestr, function(err, res){
              if (err) {
                 reject("删除失败");
              }
              else {
                resolve("删除成功");
              }
          })
        })
            return p;    
    },




    /**
    * 更新
    * wherestr : 查询条件
    * updatestr： 更新条件
    */
    update: function update(wherestr,updatestr){
      User.update(wherestr, updatestr, function(err, res){
          if (err) {
              console.log("Error:" + err);
          }
          else {
              console.log("Res:" + res);
              console.log("更新成功了");
          }
      })
  }

}
