/**
 * Created by 26223 on 2016/12/3.
 */
const HttpUtils = exports;
//引入request 模块
var request = require('request')
var querystring = require('querystring');
var md5 = require('md5');




HttpUtils.postForm = function (url,token,form, callback) {
    var header = getHeader(token,form);
    var option = {
        headers : header,
        body: form,
        json: true,
        gzip:true

    };
    return request.post(url,option, function (error, response, body) {
        resultFunction(callback,error,response,body);
    })
};




HttpUtils.postFormJson = function (url,token,form,method,callback) {
    var header = getHeader(token,form);
    let option = {
        url: url,
        method: method,
        json: true,
        headers: header,
        body: form,
        gzip:true
    };

    request(option,function (error, response, body) {
            resultFunction(callback,error,response,body);
    });
};



function resultFunction(callback,error, response, body){
    console.log("开始了");
    console.log("body-----" + body);
    if (!error && response.statusCode === 200) {
        callback({success: true, msg: body});
        console.log('request is success ');
        
    } else {
        console.log('request is error', error);
        callback({success: false, msg: error});
    }
    console.log("结束了");
}

function getHeader(token,body) {
    return {
        "deviceId": "862305035992445",
        "cType": "android",
        "deviceModel":"Redmi Note 3",
        "appName":"miqian",
        "appVersion":"2.5.0",
        "channelCode":"huawei",
        "sign":createSign(body),
        "token":token,
        "osVersion":"5.1.1",
        "netWorkStandard":"WIFI",
        "Connection":"close",
        "Host":"api.shicaidai.com",
        "Accept-Encoding":"gzip",
        "User-Agent":"okhttp/2.4.0",
        "Content-Type":"application/x-www-form-urlencoded"
    };
}


function createSign(body){
    var sign = ""
    var b = body.split("&").sort();
    for(var i =0;i<b.length;i++){
        sign = sign+b[i]+'&'
    }
    sign=(sign+"key=jwoxoWHeauio");
    return md5(sign);
}



module.exports = HttpUtils;
