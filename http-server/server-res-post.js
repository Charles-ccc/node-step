// 1. 导入http模块
var http = require('http')
var fs = require('fs')
var url = require('url')

// 2. 创建服务器
// 获取到服务器的实例对象
var server = http.createServer()
server.listen(8080, function(){
  console.log('http://127.0.0.1:8080')
})

// 监听客户端请求事件
server.on('request', function(req, res){
  console.log(req.method)
  if(req.method == 'GET') {
    // 获取get方法传参
    // url.parse(req.url, true).query.id
    if(req.url == '/') {
      fs.readFile('./index.html', 'utf-8', function(err, data){
        res.write(data)
        res.end()
      })
    } else {
      fs.readFile('./cat.png', function(err, data){
        res.end(data)
      })
    }
  } else if (req.method == 'POST') {
    // 处理在请求体中的数据
    var data = ''
    // http只能处理流数据或者消息解析
    // 这里需要利用底层Net的事件
    req.on('data', function(d){
      // Buffer 16进制流数据
      data += d
    })
    req.on('end', function(){
      console.log(require('querystring').parse(data))
    })
    res.end()
  }
})