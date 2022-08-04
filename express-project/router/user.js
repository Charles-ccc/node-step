const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const userValidator = require('../middleware/validator/userValidator')
const { verifyToken } = require('../util/jwt')
// 验证参数合法性
const { body, validationResult } = require('express-validator')
router
// 中间件处理数据校验和数据
.post('/registers', userValidator.register, userController.register)
.post('/logins', userValidator.login, userController.login)
// 请求接口时判断token
.get('/lists', verifyToken, userController.list)
.delete('/', userController.delete)

module.exports = router

// 需要挂载到app.js