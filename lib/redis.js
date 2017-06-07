var config = require("config-lite");
var redis = require('redis');

module.exports = {
    createClient: function () {
        var client = redis.createClient(config.redis["port"], config.redis["server"]);
        // redis 连接错误
        client.on("error", function (e) {
        });
        return client;
    }
};



