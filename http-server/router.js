// 根据请求方法和请求路径进行转发到不同的业务逻辑
var fs = require('fs')
var url = require('url')
var controller = require('./controller')

module.exports = (req, res) => {
  if(req.method == 'GET') {
    // 获取get方法传参
    // url.parse(req.url, true).query.id
    if(req.url == '/') {
      controller.index(res)
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
      controller.user(require('querystring').parse(data), res)
    })
    res.end()
  }
}