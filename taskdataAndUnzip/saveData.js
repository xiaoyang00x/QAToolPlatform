var chokidar = require('chokidar')
var watcher = null
var ready = false
var Autotest = require('../models/autotest')
var autotestDao = require('../dao/autotestDao');



function saveDataZip(){


function addDirecotryListener(path) {
  if (ready) {
    console.log('Directory', path, 'has been added')
  }
}


function saveData(path){
    var request = new Request({
    'associationID': 'interfaceName',
    'testcaseName': 'token4request',
    'status':'URL',
    'stackheap': 'method'
  });
}

// 删除目录时
function directoryRemovedListener(path) {
  console.info('Directory', path, 'has been removed')
}








if (!watcher) {
  watcher = chokidar.watch('/Users/alex/Desktop/unzip')
}
watcher
  .on('addDir', addDirecotryListener)
  .on('unlinkDir', directoryRemovedListener)
  .on('error', function (error) {
    log.info('Error happened', error);
  })
  .on('ready', function () {
    console.info('SaveData Initial scan complete. Ready for changes.');
    ready = true
  })
}

module.exports = saveDataZip;