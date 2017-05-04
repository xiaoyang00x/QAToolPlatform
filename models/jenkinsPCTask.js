var mongoose = require('../lib/mongo');
	Schema = mongoose.Schema;

var JenkinsPCTaskSchema = new Schema({
	testname : {type : String },
	status: { type: String },  //0:Error 1:Runing 2:Done 
	broswertype : {type : String }, //chrome firefox and so on.....
	pass: { type: String },
	fail: { type: String },
	associationID:{ type: String }, //关联autotest
	createtime: {type : String }

});
module.exports = mongoose.model('JenkinsPCTask',JenkinsPCTaskSchema);