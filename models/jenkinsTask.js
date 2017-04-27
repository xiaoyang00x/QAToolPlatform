var mongoose = require('../lib/mongo');
	Schema = mongoose.Schema;

var JenkinsTaskSchema = new Schema({
	testcase : {type : String },
	status: { type: Number },  //0:error 1:Runing 2:done 
	broswer : {type : String }, //chrome firefox and so on.....
	pass: { type: String },
	fail: { type: String },
	associationID:{ type: String } //关联autotest

});
module.exports = mongoose.model('JenkinsTask',JenkinsTaskSchema);