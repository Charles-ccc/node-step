const express = require('express')
const router = express.Router()

router.use('/user', require('./user'))
router.use('/video', require('./video'))

module.exports = router

// 需要挂载到app.js