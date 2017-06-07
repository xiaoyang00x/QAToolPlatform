var Request = require('../models/request.js');

module.exports = {

    /**
     * 插入
     * request : Request模型对象
     */
    insert: function insert(request) {
        var p = new Promise(function (resolve, reject) {
            request.save(function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        })
        return p;
    },


    /**
     * 找出对象更新
     * wherestr : 查询条件
     * remoteStr 更新条件
     */
    findOneAndUpdate: function findOneAndUpdate(wherestr, remoteStr) {
        var p = new Promise(function (resolve, reject) {
            Request.findOneAndUpdate(wherestr, remoteStr, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        })
        return p;
    },


    /**
     * 找出对象更新
     * wherestr : 查询条件
     * updatestr： 更新条件
     */
    findOneAndRemove: function findOneAndRemove(wherestr) {

        var p = new Promise(function (resolve, reject) {
            Request.findOneAndRemove(wherestr, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        })
        return p;
    },


    /**
     * 通过属性删除数据
     * wherestr : 属性条件
     */
    del: function del(wherestr) {
        var p = new Promise(function (resolve, reject) {
            Request.remove(wherestr, function (err, res) {
                if (err) {
                    console.log("Error:" + err);
                    reject(err);
                }
                else {
                    console.log("Res:" + res);
                    console.log("删除成功！！！");
                    resolve(res);
                }
            });
        })
        return p;
    },


    /**
     * 通过条件查询
     * wherestr : 属性条件 / 为空的时候查询所有
     */
    getByConditions: function getByConditions(wherestr, callback) {

        var p = new Promise(function (resolve, reject) {
            Request.find(wherestr, function (err, res) {
                if (err) {
                    console.log("Error:" + err);
                    reject(err);
                }
                else {
                    console.log("Res:" + res);
                    resolve(res);
                }
            });
        })
        return p;

    },



    findAllInterFace: function find() {
        var p = new Promise(function (resolve, reject) {
            Request.find("", function (err, res) {
                if (err) {
                    console.log("Error:" + err);
                    reject(err);
                }
                else {
                    console.log("Res:" + res);
                    resolve(res);
                }
            });
        })
        return p;
    }

}
