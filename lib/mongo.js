var config = require('config-lite');
var mongoose = require("mongoose");


var options = {
    server: {
        auto_reconnect: true,
        poolSize: 10
    }
};

/**
  * 连接
  */
mongoose.Promise = global.Promise
mongoose.connect(config.mongodb,options);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + config.mongodb);  
});    

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});   


module.exports = mongoose;


//var Mongolass = require('mongolass');
//var mongolass = new Mongolass();
//mongolass.connect(config.mongodb);


// exports.User = mongolass.model('User', {
//   name: { type: 'string' },
//   password: { type: 'string' }
// });


//exports.User.index({ name: 1 }, { unique: true }).exec();// 根据用户名找到用户，用户名全局唯一
