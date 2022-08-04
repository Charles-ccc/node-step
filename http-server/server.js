// 1. 导入http模块
var http = require('http')
var fs = require('fs')
var url = require('url')
var router = require('./router')
// 2. 创建服务器
// 获取到服务器的实例对象
var server = http.createServer()
server.listen(8080, function(){
  console.log('http://127.0.0.1:8080')
})

// 监听客户端请求事件，给服务绑定请求事件
server.on('request', function(req, res){
  router(req, res)
})