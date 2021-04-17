const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(createProxyMiddleware('/api', { 
      //  target: 'http://139.155.172.69:7001',
       target: 'http://127.0.0.1:7001',
       secure: false,
       changeOrigin: true,
       pathRewrite: {
        '/api': '/'
       },
       // cookieDomainRewrite: "http://localhost:3000"
    }))
}