// 加载所有不同的路有模块，挂载到app.js

const express = require('express')
const router = express.Router()

router.use('/user', require('./user'))
router.use('/video', require('./video'))

module.exports = router

