var mongoose = require('../lib/mongo');
	Schema = mongoose.Schema;

var AutotestSchema = new Schema({
	pass: { type: String },
	fail: { type: String },
	associationID:{ type: String }. //关联jenkinsTask
});
module.exports = mongoose.model('Autotest',AutotestSchema);