// 专门用来操作数据库

const mongoose = require('mongoose')
const userSchema = require('./userModel')
const { mongodbPath } = require('../config/config.default')
async function main () {
  // 设置默认 mongoose 连接
  await mongoose.connect(mongodbPath)
}

main()
.then(res => {
  console.log('mongo链接成功')
})
.catch(err => {
  console.log(err, 'mongo链接失败')
})

module.exports = {
  // 集合的名字需要首字母大写
  UserModel:  mongoose.model('User', userSchema)
}

// 参数 集合名，模型
// 如果有同名集合，就直接链接，没有就添加一个 s 并创建
// const userModel = mongoose.model('User', userSchema)
// const userBack = new userModel({})