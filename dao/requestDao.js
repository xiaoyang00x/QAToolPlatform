var Request = require('../models/request.js');

module.exports = {

    /**
    * 插入
    * request : Request模型对象
    */
    insert: function insert(request,callback) {
      request.save(function (err, res) {
          if (err) {
              callback(err,null);
          }
          else {
              callback(null,res);
          }
      });
  },




    /**
    * 找出对象更新
    * wherestr : 查询条件
    * remoteStr 更新条件
    */
    findOneAndUpdate: function findOneAndUpdate(wherestr,remoteStr){

      Request.findOneAndUpdate(wherestr, remoteStr, function(err, res){
      })
  },


    /**
    * 找出对象更新
    * wherestr : 查询条件
    * updatestr： 更新条件
    */
    findOneAndRemove: function findOneAndRemove(wherestr,callback){

      Request.findOneAndRemove(wherestr, function(err, res){
            if (err) {
                callback(err,null);
            }
            else {
                callback(null,res);
            }
      })
  },




    /**
    * 通过属性删除数据
    * wherestr : 属性条件
    */
    del: function del(wherestr){
        Request.remove(wherestr, function(err, res){
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
        
        Request.find(wherestr, function(err, res){
            if (err) {
                callback(err,null);
            }
            else {
            	console.log(res);
                callback(null,res);
            }
        })
    },


    findAllInterFace: function find(callback){
      Request.find("",function(err,res){
            if (err) {
                callback(err,null);
            }
            else {
                callback(null,res);
            }
      })
    }



}


// requestDao.getByConditions("",function(err,res){

// })

// requestDao.findAll(function(err,res){

// });

// var requestDao = require("./requestDao")
// var request = new Request({'interfaceName': '我来测试一下',
//                      'token4request' : 'yangyu8',
//                  	 'URL':'www.baidu.com',
//                  	 'method':'POST',
//                  	 'body':'a=1&b=3'});

// requestDao.insert(request,function(err,res){
// 	requestDao.findOneAndRemove({'interfaceName':'我来测试一下'},function(err,res){

// })
// });




