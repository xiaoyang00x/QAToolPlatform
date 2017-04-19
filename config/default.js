module.exports = {
  port: 3000,
  session: {
    secret: 'QAToolPlatform',
    key: 'QAToolPlatform',
    maxAge: 6000000
  },
  mongodb: 'mongodb://10.0.1.167:27017/QAToolPlatform'
};