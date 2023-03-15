const express = require('express')
const fs = require('fs')
const db = require('./db')

const app = express()
// 接收客户端传递格式
// app.use(express.urlencoded())
app.use(express.json())

// express不需要监听请求方法了，也不需要绑定事件
app.get('/', async (req,res) => {
  try {
    let back = await db.getDb()
    // express封装的send方法，可以直接将数据转移并响应返回
    res.send(back.users)
  } catch (err) {
    res.status(500).json({err})
  }
})

app.post('/', async (req, res) => {
  // 包含客户端的全部请求数据
  let body = req.body
  if (!body) {
    res.status(403).json({error: 'data not invalid'})
  }
  let back = await db.getDb()
  // 添加新Id
  body.id = back.users[back.users.length - 1].id + 1
  back.users.push(body)
  try {
    // 存入json
    let s = await db.setDb(back)
    if (!s) {
      res.status(200).send({msg: 'add successed'})
    }
  } catch (err) {
    res.status(500).json({err})
  }
})

app.put('/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    let userInfo = await db.getDb()
    const userId = Number(req.params.id)
    // 找到对应的数据
    let user = userInfo.users.find(item => item.id === userId)
    if (!user) {
      res.status(403).json({error: 'user not exist'})
    }
    const body = req.body
    user.username = body.username || user.username
    user.age = body.age || user.age
    userInfo.users[userId - 1] = user
    const s = await db.setDb(userInfo)
    if (!s) {
      res.status(201).json({msg: 'change successed'})
    }
  } catch (err) {
    res.status(500).json({err})
  }
})

app.listen(3000, () => {
  console.log('Run http://127.0.0.1:3000');
})