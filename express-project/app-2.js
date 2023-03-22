const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

// app.use((req, res, next) => {

// })

// app.get('/user', (req, res, next) => {

// })

// 限定请求方法的中间件
// 多个处理函数针对一个路由的匹配
app.get('/user', (req, res, next) => {
  console.log('aaa')
  next()
}, (req, res, next) => {
  console.log('bbb')
  // res.send()
  next()
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
