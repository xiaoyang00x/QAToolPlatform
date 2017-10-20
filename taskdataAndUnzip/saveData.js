var chokidar = require('chokidar')
var Autotest = require('../models/autotask')
var autotestDao = require('../dao/autotaskDao');
var parseString = require('xml2js').parseString;
var JenkinsTask = require('../models/jenkinsTask');
var jenkinsTaskDao = require('../dao/jenkinsTaskDao');
var rf = require("fs");
var path = require('path');
var config = require('config-lite');
var watcher = null
var ready = false


function saveDataZip() {


    function addDirecotryListener(path_) {
        if (ready) {
            console.log('Directory', path_, 'has been added');
            saveAutoTestData(path_)
                .then(function (data) {
                    console.log(data);
                    return updateJenkinsTask(path_);
                })
                .then(function (data) {
                    console.log(data);
                    return deleteDirecotry(path_)
                })
                .catch(function (reason) {
                    console.log('rejected');
                    console.log(reason);
                    updateVoidJenkinsTask(path_)
                        .then(function (data) {
                            console.log(data);
                            return deleteDirecotry(path_)
                        })
                })
        }
    }


    function saveAutoTestData(path_) {
        var p = new Promise(function (resolve, reject) {
            var associationID = path.basename(path_);
            var data = rf.readFileSync(path_ + '/testng-results.xml', 'utf-8');
            parseString(data, function (err, result) {

                var reportResult = result['testng-results']['suite'][0]['test'][0]['class'][0]['test-method'];
                for (var i = 0; i < reportResult.length; i++) {
                    if (reportResult[i]['$']['name'] == 'initDriver' || reportResult[i]['$']['name'] == 'destoryDriver') {
                        if (reportResult[i]['$']['status'] != 'PASS') {
                            var autotest = new Autotest({
                                'associationID': associationID,
                                'testcaseName': reportResult[i]['$']['name'],
                                'status': reportResult[i]['$']['status'],
                                'stackheap': JSON.stringify(reportResult[i]['exception'])
                            });
                            autotestDao.insert(autotest, function (err, result) {
                                if (err) {
                                    reject('插入失败');
                                }
                                else {
                                    updateSkipJenkinsTask(path_);
                                    resolve('插入完成');
                                }
                            });
                        }
                    }


                    if (reportResult[i]['$']['name'] != 'initDriver' && reportResult[i]['$']['name'] != 'destoryDriver') {
                        var autotest = new Autotest({
                            'associationID': associationID,
                            'testcaseName': reportResult[i]['$']['name'],
                            'status': reportResult[i]['$']['status'],
                            'stackheap': JSON.stringify(reportResult[i]['exception'])
                        });
                        autotestDao.insert(autotest, function (err, result) {
                            if (err) {
                                reject('插入失败');
                            }
                            else {
                                resolve('插入完成');
                            }
                        });
                    }
                }
            });
        })
        return p;
    }


    function updateJenkinsTask(path_) {
        var p = new Promise(function (resolve, reject) {
            var associationID = path.basename(path_);
            var data = rf.readFileSync(path_ + '/testng-results.xml', 'utf-8');
            parseString(data, function (err, result) {
                var reportResult = result['testng-results']['$'];
                jenkinsTaskDao.update({associationID: associationID}, {
                    pass: parseInt(reportResult['passed']),
                    fail: parseInt(reportResult['failed']),
                    status: 'Done'
                }, function (err, res) {
                    if (err) {
                        reject(associationID + '更新失败');
                    }
                    else {
                        resolve(associationID + '更新完成');
                    }
                })
            });
        })
        return p;
    }


    function updateVoidJenkinsTask(path_) {
        var p = new Promise(function (resolve, reject) {
            var associationID = path.basename(path_);
            var data = rf.readFileSync(path_ + '/testng-results.xml', 'utf-8');
            parseString(data, function (err, result) {
                var reportResult = result['testng-results']['$'];
                jenkinsTaskDao.update({associationID: associationID}, {
                    pass: 0,
                    fail: 0,
                    status: 'Void'
                }, function (err, res) {
                    if (err) {
                        reject(associationID + '更新失败');
                    }
                    else {
                        resolve(associationID + '更新完成');
                    }
                })
            });
        })
        return p;
    }

    function updateSkipJenkinsTask(path_) {
        var p = new Promise(function (resolve, reject) {
            var associationID = path.basename(path_);
            var data = rf.readFileSync(path_ + '/testng-results.xml', 'utf-8');
            parseString(data, function (err, result) {
                var reportResult = result['testng-results']['$'];
                jenkinsTaskDao.update({associationID: associationID}, {
                    pass: 0,
                    fail: 0,
                    status: 'Skip'
                }, function (err, res) {
                    if (err) {
                        reject(associationID + '更新失败');
                    }
                    else {
                        resolve(associationID + '更新完成');
                    }
                })
            });
        })
        return p;
    }


    function deleteDirecotry(path_) {
        console.log(path_);
        var p = new Promise(function (resolve, reject) {
            rf.unlinkSync(path_ + '/testng-results.xml');
            rf.rmdirSync(path_)
            if (!rf.existsSync(path_)) {
                resolve(path_ + '删除完成');
            } else {
                reject(path_ + '删除失败');
            }
        })
        return p;
    }


// 删除目录时
    function directoryRemovedListener(path) {
        console.info('Directory', path, 'has been removed')
    }


    if (!watcher) {
        watcher = chokidar.watch(config.unzipPath);
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