var redis = require("redis");
var client = require("../lib/redis").createClient();

module.exports = {

    getAccessAmount : function (keyName) {
        return new Promise(function (resolved, rejected){
            client.get(keyName, function (err, reply) {
                if(err){
                    rejected(err);
                }else{
                    resolved (reply);
                }
            });
        });
    }
};