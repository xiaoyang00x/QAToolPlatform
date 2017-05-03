var User = require('../models/user.js');
// var sha1 = require('sha1');


module.exports = {

    /**
    * 插入
    * user : User模型对象
    */
    insert: function insert(user,callback) {
      user.save(function (err, res) {
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
  },


    /**
    * 找出对象更新
    * wherestr : 查询条件
    * updatestr： 更新条件
    */
    findOneAndUpdate: function findOneAndUpdate(wherestr,updatestr){

      User.findOneAndUpdate(wherestr, updatestr, function(err, res){
          if (err) {
              console.log("Error:" + err);
          }
          else {
              console.log("Res:" + res);
              console.log("更新成功");
          }
      })
  },




    /**
      * 通过id查询更新
      * id : 数据id
      * updatestr： 更新条件
      */
    findByIdAndUpdate: function findByIdAndUpdate(id,updatestr){
        User.findByIdAndUpdate(id, updatestr, function(err, res){
            if (err) {
                console.log("Error:" + err);
            }
            else {
                console.log("Res:" + res);
                console.log("成功了");
            }
        })
    },

    /**
    * 通过属性删除数据
    * wherestr : 属性条件
    */
    del: function del(wherestr){
        User.remove(wherestr, function(err, res){
            if (err) {
               console.log("Error:" + err);
               return error;
            }
            else {
                console.log("Res:" + res);
                console.log("删除成功！！！");
                return res;
            }
        })
    },


    /**
      * 通过条件查询
      * wherestr : 属性条件 / 为空的时候查询所有
      */
    getByConditions: function getByConditions(wherestr,callback){
        
        User.find(wherestr, function(err, res){
            if (err) {
                callback(err,null);
            }
            else {
                callback(null,res);
            }
        })
    }

}

// var UserModel = require('../models/user');
// var UserDao = require('../dao/userDao');


// var user = new UserModel({
//   'name': 'fdsfds',
//   'password': sha1('fdsfds')
// });
// UserDao.insert(user,function(err,res){

// })
