var mongoose = require('../lib/mongo');
Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {type: String},
    password: {type: String},
    nickName: {type: String},
    email: {type: String},
    phoneNumber: {type: String},
    role: {type: String}
});

module.exports = mongoose.model('User', UserSchema);