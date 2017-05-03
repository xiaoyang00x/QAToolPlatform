var parseString = require('xml2js').parseString;
var rf = require("fs");
var select = require("xpath.js");
var dom = require("xmldom").DOMParser;



//同步读取文件
var data = rf.readFileSync('/Users/alex/Desktop/AutoTestReustReport/testng-results.xml','utf-8');
var doc = new dom().parseFromString(data);
var nodes = select(doc, "//testng-results");


 // var xml = "<book><title>Harry Potter</title></book>"
 // var doc = new dom().parseFromString(xml)    
 // var nodes = select(doc, "//title")

var pass = nodes[0].attributes[3].value;
var total = nodes[0].attributes[2].value;
var failed = total-pass;

console.log("total : ----------"+total);
console.log("pass : ----------"+pass);
console.log("failed : ----------"+failed);