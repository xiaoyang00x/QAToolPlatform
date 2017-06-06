module.exports = {
    port: 3000,
    session: {
        secret: 'QAToolPlatform',
        key: 'QAToolPlatform',
        maxAge: 6000000
    },
    mongodb: 'mongodb://10.0.1.230:27017/QAToolPlatform',
    reportPath: '/Users/alex/Desktop/report/',
    unzipPath: '/Users/alex/Desktop/unzip/',
    loginURL: 'https://testapi.miaoqian.com',
    redis: {
        "server": "10.0.1.230",
        "port": "6379",
        "auth": "qatool"
    }
};