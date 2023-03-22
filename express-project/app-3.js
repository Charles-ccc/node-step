const express = require('express')
const router = require('./router')
const videoRouter = require('./router/video')
const app = express()

// 应用程序中间件挂载
// app.use(router)

// 补充前缀
app.use('/user', router)
app.use('/video', videoRouter)

// 匹配所有的，或者匹配那些没匹配上的
app.use((req, res, next) => {
  res.status(404).send('404 Not Found.')
})

// express 如果回调中有四个参数，就会认为是错误处理的中间件
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send('Service Error')
})

// 匹配所有的请求方法
// app.all('/xxx', (req, res) => {
//   res.send('xxx')
// })

// ? 问号前面是可选路径
// + 加号前面的字母可以重复多次
// * 通配，匹配任意的字符
// 与正则表达式一致
/** 
app.all('/te?st', (req, res) => {
  res.send('xxx')
  res.download()
  res.end()
  res.json()
  res.redirect('/xxx')
  res.render()
  res.status()
  res.sendStatus()
})
*/
// 路径参数可以通过 req.params 获取

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
