var jenkinsapi = require('jenkins-api');

var jenkins = jenkinsapi.init("http://xiaoyang00x:xiaoyang00x@172.18.0.53:9999");


// var token = jenkinsapi.init('https://xiaoyang00x:token@172.18.0.53:9999');


//all jobs


// jenkins.all_jobs(function(err, data) {
//   if (err){ return console.log(err); }
//   console.log(data)
// });


//job info
// jenkins.job_info('AndroidAPK', function(err, data) {
//   if (err){ return console.log(err); }
//   console.log(data)
// });

//enablejob

// jenkins.enable_job('AndroidAPK', function(err, data) {
//   if (err){ return console.log(err); }
//   console.log(data)
// });



//build

// jenkins.build('Mytest', function(err, data) {
//   if (err){

//   	console.log("进入错误了！！！！！！！");
//    return console.log(err); 


//   }
//   console.log("正确流程了！！！！！！！！");
//   console.log(data)
// });



//build with para


jenkins.build('H5AutomationTest4system', {deviceType: 'pc',testName:'',isVideo:'false',broswerType:'firefox',isLocalVideo:'false',associationID:'shishijiushishi'}, function(err, data) {
  if (err){ return console.log(err); }
  console.log(data)

});

// jenkins.job_output('H5AutomationTest', '#99',function(err, data) {
//   if (err){ return console.log(err); }
//   console.log(JSON.stringify(data))
// });
// jenkins.last_build_report('H5AutomationTest', function(err, data) {
//   if (err){ return console.log(err); }
//   console.log(JSON.stringify(data))
// });

// jenkins.queue(function(err, data) {
//   if (err){ return console.log(err); }
//   console.log(data)
// });
