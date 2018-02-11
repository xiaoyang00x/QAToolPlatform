module.exports = {
    port: 3000,
    session: {
        secret: 'QAToolPlatform',
        key: 'QAToolPlatform',
        maxAge: 6000000
    },
    mongodb: 'mongodb://10.5.233.20:27017/QAToolPlatform',
    reportPath: '/Users/yangyu/Desktop/report',
    unzipPath:  '/Users/yangyu/Desktop/unzip',
    loginURL: 'https://testapi.miaoqian.com',
};