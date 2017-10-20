var mongoose = require('../lib/mongo');
Schema = mongoose.Schema;

var JenkinsTaskSchema = new Schema({
    testname: {type: String},
    status: {type: String},  //0:Error 1:Runing 2:Done
    broswertype: {type: String}, //chrome firefox and so on.....
    pass: {type: Number},
    fail: {type: Number},
    associationID: {type: String}, //关联autotest
    createtime: {type: String},
    queryCountTime: {type: Date},
    deviceType: {type: String}

});
module.exports = mongoose.model('JenkinsTask', JenkinsTaskSchema);