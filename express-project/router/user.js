const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const userValidator = require('../middleware/validator/userValidator')
const { verifyToken } = require('../util/jwt')
// 验证参数合法性
const { body, validationResult } = require('express-validator')
const multer = require('multer')
// 上传地址
const upload = multer({dest: 'public/'})

router
// 中间件处理数据校验和数据，处理请求路径的方法
.post('/registers', userValidator.register, userController.register)
.post('/logins', userValidator.login, userController.login)
// 请求接口时判断token
.get('/lists', verifyToken, userController.list)
.put('/', verifyToken, userValidator.update, userController.update)
.post('/avatar', verifyToken, upload.single('avatar'), userController.avatar)
.delete('/', userController.delete)

module.exports = router

// 需要挂载到app.js