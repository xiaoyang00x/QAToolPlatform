var mongoose = require('../lib/mongo');
	Schema = mongoose.Schema;

var RequestSchema = new Schema({
	interfaceName : {type : String },
	token4request: { type: String },
	URL : {type : String },
	method: { type: String },
	body: { type: String }
});
module.exports = mongoose.model('Request',RequestSchema);