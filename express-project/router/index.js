// 加载所有不同的路有模块，挂载到app.js
const express = require('express')
// 路由实例对象
const router = express.Router()

router.use('/user', require('./user'))
router.use('/video', require('./video'))

module.exports = router

