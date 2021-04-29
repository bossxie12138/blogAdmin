const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(createProxyMiddleware('/api', { 
    target: 'http://127.0.0.1:7001', // 目标服务器地址，这里使用了egg.js所以端口是7001
    secure: false,
    changeOrigin: true,
    pathRewrite: {
    '/api': '/'
    }
  }))
}