const jwt = require('jsonwebtoken')
const { uuid } = require('../config/config.default')
// jwt.sign 和 jwt.verify都是异步方法，通过回调方式返回结果
// const token = jwt.sign({foo: 'hello'}, 'kkkccc')
// const signResult = jwt.verify(token, 'kkkccc')

// promisify 将基于回调的函数转换为基于 Promise 的函数
const { promisify } = require('util')
const toJwt = promisify(jwt.sign)
const verify = promisify(jwt.verify)

module.exports.createToken = async (userInfo) => {
  return await toJwt(
    {userInfo},
    uuid,
    // {
    //   expiresIn: '1d'
    // }
  )
}

// 封装成中间件的格式
module.exports.verifyToken = async (req, res, next) => {
  // 从请求头的Authorization获取token
  let token = req.headers.authorization
  token = token ? token.split("Bearer ")[1] : null
  if (!token) {
    res.status(402).json({error: '请正确传入token'})
  }
  try {
    const userInfo = await verify(token, uuid)
    req.user = userInfo
    next()
  } catch (err) {
    res.status(402).json({error: '无效token'})
  }
}
