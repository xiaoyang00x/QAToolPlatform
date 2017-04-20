var superagent = require('superagent');

superagent('POST','https://api.shicaidai.com/userService/getUserInfo')
		 .set({
	        "deviceId": "862305035992445",
	        "cType": "android",
	        "deviceModel":"Redmi Note 3",
	        "appName":"miqian",
	        "appVersion":"2.5.0",
	        "channelCode":"huawei",
	        "sign":"38c2c9feb1d208e1879e03c877a76d57",
	        "token":"c4acd1c76e7541bf8ddb423648fec8ad",
	        "osVersion":"5.1.1",
	        "netWorkStandard":"WIFI",
	        "Connection":"close",
	        "Host":"api.shicaidai.com",
	        "Accept-Encoding":"gzip",
	        "User-Agent":"okhttp/2.4.0",
	        "Content-Type":"application/x-www-form-urlencoded"
	    	})
		 .send("custId=000000000000000000000209495079&timer=1488349741030")
	     .end(function(req,res){
	         console.log(res.body);
	     })


