const mongoose = require('mongoose')
const md5 = require('../util/md5')
const baseModel = require('./baseModel')

// 集合规则
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    // 使用md5进行加密
    set: value => md5(value),
    // 数据库查询时数据是否返回
    select: false
  },
  phone: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: null
  },
  ...baseModel
})

module.exports = userSchema