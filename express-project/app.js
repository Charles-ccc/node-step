const express = require('express')
const cors = require('cors')
const morgan = require('morgan')  // 日志记录
const router = require('./router')
const app = express()
const PORT = process.env.PORT || 3000

// 处理接受的数据格式
app.use(express.json())
app.use(express.urlencoded())
// 处理跨域
app.use(cors())
app.use(morgan('dev'))
// 添加路由前缀，挂载路由
app.use('/api/v1', router)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
