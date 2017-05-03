var parseString = require('xml2js').parseString;
var rf = require("fs");
var path = require('path');

rf.unlinkSync("/Users/alex/Desktop/unzip/asd/");


//同步读取文件c
// var data = rf.readFileSync('/Users/alex/Desktop/unzip/yangyuwudi/testng-results.xml','utf-8');
// parseString(data, function (err, result) {
//     //var reportResult = result['testng-results']['suite'][0]['test'][0]['class'][0]['test-method'];

//     var reportResult = result['testng-results']['$'];
//     console.log("skipped:-------------"+reportResult['skipped']);
//     console.log("failed:--------------"+reportResult['failed']);
//     console.log("total:---------------"+reportResult['total']);
//     console.log("passed:--------------"+reportResult['passed']);
//         for(var i= 0;i<reportResult.length;i++){
//     	if(reportResult[i]['$']['name']!='initDriver'&&reportResult[i]['$']['name']!='destoryDriver'){
//     		console.log(reportResult[i]);
//     		//console.log(reportResult[i]['$']['name']);
//     		//console.log(reportResult[i]['$']['status']);
//     		//console.log(JSON.stringify(reportResult[i]['exception']));

//     	}
//     }
// });


