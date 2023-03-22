const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router')
const app = express()
const PORT = process.env.PORT || 3000

// 处理接收的数据格式 解析客户端请求
app.use(express.json())
// 解析格式
app.use(express.urlencoded())
// 处理静态资源请求，全部转发到public目录下
app.use(express.static('public'))
// 处理跨域
app.use(cors())
// 日志记录
app.use(morgan('dev'))
// 添加路由前缀，挂载路由
app.use('/api/v1', router)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
