var adm_zip = require('adm-zip');
var chokidar = require('chokidar')
var watcher = null
var ready = false
var path = require('path');
var fs = require('fs');
var config = require('config-lite');

function watchZip() {


    function sleep(time = 0) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time);
        })
    };


// 文件新增时
    function addFileListener(path_) {
        if (ready) {
            console.log('File', path_, 'has been added');
            sleep(5000).then(function (data) {
                return unzip(path_);
            })
                .then(function (data) {
                    console.log(data);
                    return deleteZip(path_);
                })
                .then(function (data) {
                    console.log(data);
                })
                .catch(function (reason) {
                    console.log('rejected');
                    console.log(reason);
                })
        }
    }


    function addDirecotryListener(path) {
        if (ready) {
            console.log('Directory', path, 'has been added')
        }
    }

    function deleteZip(path_) {

        var p = new Promise(function (resolve, reject) {
            fs.unlinkSync(path_);
            if (!fs.existsSync(path_)) {
                resolve(path_ + '删除完成');
            } else {
                reject(path_ + '删除失败');
            }
        })
        return p;
    }


    function unzip(path_) {
        var unzip = new adm_zip(path_);
        var p = new Promise(function (resolve, reject) {
            console.log(config.reportPath + '/' + path.basename(path_, '.zip'));
            if (fs.existsSync(path_)) {
                unzip.extractEntryTo(/*entry name*/"AutoTestReport/testng-results.xml", /*target path*/config.reportPath + '/' + path.basename(path_, '.zip'), /*maintainEntryPath*/false, /*overwrite*/false);
                resolve(path_ + '解压完成');
            } else {
                reject('文件都不存在');

            }
        })
        return p;
    }


// 文件内容改变时
    function fileChangeListener(path_) {
        console.log('File', path_, 'has been changed')
    }

// 删除文件时，需要把文件里所有的用例删掉
    function fileRemovedListener(path_) {
        console.log('File', path_, 'has been removed')
    }

// 删除目录时
    function directoryRemovedListener(path) {
        console.info('Directory', path, 'has been removed')
    }

    if (!watcher) {
        watcher = chokidar.watch(config.unzipPath);
    }
    watcher
        .on('add', addFileListener)
        .on('unlink', fileRemovedListener)
        .on('addDir', addDirecotryListener)
        .on('error', function (error) {
            log.info('Error happened', error);
        })
        .on('ready', function () {
            console.info('WatchZip Initial scan complete. Ready for changes.');
            ready = true
        })
}

module.exports = watchZip;
