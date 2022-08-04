var fs = require('fs')

module.exports = {
  // 处理主页信息返回
  index(res){
    fs.readFile('./index.html', 'utf-8', function(err, data){
      res.write(data)
      res.end()
    })
  }, 

  user(postData, res){
    // 处理业务逻辑
    console.log(postData)
  }
}