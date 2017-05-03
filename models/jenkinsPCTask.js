var mongoose = require('../lib/mongo');
	Schema = mongoose.Schema;

var JenkinsPCTaskSchema = new Schema({
	testcase : {type : String },
	status: { type: String },  //0:Error 1:Runing 2:Done 
	broswer : {type : String }, //chrome firefox and so on.....
	pass: { type: String },
	fail: { type: String },
	associationID:{ type: String } //关联autotest

});
module.exports = mongoose.model('JenkinsPCTask',JenkinsPCTaskSchema);