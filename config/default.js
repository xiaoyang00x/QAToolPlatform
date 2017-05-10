module.exports = {
  port: 3000,
  session: {
    secret: 'QAToolPlatform',
    key: 'QAToolPlatform',
    maxAge: 6000000
  },
  mongodb: 'mongodb://10.0.1.167:27017/QAToolPlatform',
  URL:'http://10.0.1.167:3000/',
  reportPath:'/Users/alex/Desktop/report/',
  unzipPath:'/Users/alex/Desktop/unzip/',
  redis: {
      "server" : "127.0.0.1",
      "port" : "6379",
      "auth" : "qatool"
  }
};