var mongoose = require('../lib/mongo');
	Schema = mongoose.Schema;

var AutotaskSchema = new Schema({
	associationID:{type: String }, //关联jenkinsTask
	testcaseName:{type:String},
	status:{type: String},  //0：skip 1:pass 2:fail
	stackheap:{type: String} 
});
module.exports = mongoose.model('Autotask',AutotaskSchema);