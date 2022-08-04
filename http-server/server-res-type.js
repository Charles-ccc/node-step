// 1. 导入http模块
var http = require('http')
var fs = require('fs')
// 2. 创建服务器
// 获取到服务器的实例对象
var server = http.createServer()
server.listen(8080, function(){
  console.log('http://127.0.0.1:8080')
})

// 监听客户端请求事件
// req 本次请求的信息
// res 响应处理方法
server.on('request', function(req, res){
  // 判断请求
  console.log(req.url)
  if(req.url == '/') {
     // 读取html文件
    fs.readFile('./index.html', 'utf-8', function(err, data){
      res.write(data)
      res.end()
    })
  } else {
    fs.readFile('./cat.png', function(err, data){
      // 合并write end
      res.end(data)
    })
  }
  // 处理响应不同的数据类型
  // res.setHeader('Content-Type', 'text/plain;charset=utf-8')
  // res.setHeader('Content-Type', 'text/html;charset=utf-8')
  // res.write('<h3>你好</h3>')

  // 处理完需要断开
  // res.end()
})