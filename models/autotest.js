var mongoose = require('../lib/mongo');
	Schema = mongoose.Schema;

var AutotestSchema = new Schema({
	associationID:{ type: String }, //关联jenkinsTask
	status:{type: String},  //0：skip 1:pass 2:fail
	stackheap:{type: String} 
});
module.exports = mongoose.model('Autotest',AutotestSchema);