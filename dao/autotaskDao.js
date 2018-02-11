var Autotask = require('../models/autotask.js');
module.exports = {

    /**
    * 插入
    * user : User模型对象
    */
    insert: function insert(autotask,callback) {
      autotask.save(function (err, res) {
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

          Autotask.remove(wherestr, function(err, res){
              if (err) {
                 reject(err);
              }
              else {
                resolve(res);
              }
          })
        })

    },




    /**
      * 通过条件查询
      * wherestr : 属性条件 / 为空的时候查询所有
      */
    getByConditions: function getByConditions(wherestr){

        var p = new Promise(function(resolve, reject){

          Autotask.find(wherestr, function(err, res){
              if (err) {
                reject(err);
              }
              else {
                resolve(res);
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
      Autotask.update(wherestr, updatestr, function(err, res){
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
