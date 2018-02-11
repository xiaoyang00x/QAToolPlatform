require('events').EventEmitter.prototype._maxListeners = 100;
var path = require('path');
var log4js = require('log4js');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var routes = require('./routes');
var pkg = require('./package');
var cookieParser = require('cookie-parser');
var winston = require('winston');
var expressWinston = require('express-winston');
var watchZip = require('./taskdataAndUnzip/watchZip.js');
var saveData = require('./taskdataAndUnzip/saveData.js');
var log4js = require('log4js');
var app = express();


// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为 ejs
app.set('view engine', 'ejs');

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'controller')));



//日志功能 当logType为file时候日志打印到log文件，console时日志直接控制台打印
var logType = 'console';
log4js.configure({
    appenders: {server: {type: 'file', filename: 'logs/access.log'}, console: {type: 'console'}},
    categories: {default: {appenders: [logType], level: 'info'}}
});


exports.logger=function(name){
    var logger = log4js.getLogger(name);
    app.use(log4js.connectLogger(logger, {level:log4js.levels.INFO, format:':method :url'}));
    return logger;
};


//log日志





// session 中间件
app.use(session({
    name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({// 将 session 存储到 mongodb
        url: config.mongodb// mongodb 地址
    }),
    resave: false,
    saveUninitialized: true,
}));

// flash 中间件，用来显示通知
app.use(flash());


// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
    //uploadDir: path.join(__dirname, 'public/img'),// 上传文件目录
    //keepExtensions: true// 保留后缀
}));


// 设置模板全局常量
app.locals.blog = {
    title: pkg.name,
    description: pkg.description
};

// 添加模板必需的三个变量
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

routes(app);

// error page
app.use(function (err, req, res, next) {
    res.render('error', {
        error: err
    });
});

this.logger("index").info("QAToolPlatform startting......");

// 监听端口，启动程序
app.listen(config.port, function () {
    // this.logger.info(`${pkg.name} listening on port ${config.port}`);
});

this.logger("index").info("QAToolPlatform complete......");

new watchZip();
new saveData();

