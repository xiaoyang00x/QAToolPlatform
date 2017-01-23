module.exports = {
  port: 3000,
  session: {
    secret: 'QAToolPlatform',
    key: 'QAToolPlatform',
    maxAge: 6000000
  },
  mongodb: 'mongodb://localhost:27017/QAToolPlatform'
};