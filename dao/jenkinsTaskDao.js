var JenkinsTask = require('../models/jenkinsTask.js');


module.exports = {

    /**
     * 插入
     * user : User模型对象
     */
    insert: function insert(JenkinsTask, callback) {
        JenkinsTask.save(function (err, res) {
            if (err) {
                console.log("Error:" + err);
                callback(err, null);
            }
            else {
                console.log("Res:" + res);
                console.log("插入成功了");
                callback(null, res);
            }
        });
    },


    /**
     * 更新
     * wherestr : 查询条件
     * updatestr： 更新条件
     */
    update: function update(wherestr, updatestr, callback) {
        JenkinsTask.update(wherestr, updatestr, function (err, res) {
            if (err) {
                console.log("Error:" + err);
                callback(err, null);
            }
            else {
                console.log("Res:" + res);
                console.log("更新成功了");
                callback(null, res);
            }
        })
    },


    /**
     * 通过属性删除数据
     * wherestr : 属性条件
     */
    del: function del(wherestr) {

        var p = new Promise(function (resolve, reject) {
            JenkinsTask.remove(wherestr, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve("删除成功");
                }
            })
        })
        return p;
    },


    /**
     * 获取本年折线图的数据
     * thisYear:当年第一天
     */
    getLineChart: function getLineChart(thisYear) {
        console.log("今年的参数是" + thisYear);
        var p = new Promise(function (resolve, reject) {
            var arr = new Array()
            JenkinsTask.aggregate(
                {
                    $match: {queryCountTime: {$gte: new Date(thisYear), $lte: new Date()}}
                },
                {
                    $group: {
                        _id: {$month: "$queryCountTime"},
                        num_tutorial: {$sum: {$add: ["$pass", "$fail"]}}
                    }
                },
                {$sort: {"_id": 1}}
            ).exec(function (err, res) {
                if (err) {
                    reject(err)
                } else {
                    for(var i=0;i<res.length;i++){
                        arr[i] = new Array();
                        arr[i] = [res[i]._id,res[i].num_tutorial]
                    }
                    resolve(arr);
                }
            })
        })
        return p;
    },


    findAllPcTask: function find(callback) {
        JenkinsTask.find({}).sort({'_id': -1}).exec(function (err, res) {
            if (err) {
                console.log("Error:" + err);
                callback(err, null);
            }
            else {
                console.log("Res:" + res);
                console.log("查询成功");
                callback(null, res);
            }
        })
    },


}
