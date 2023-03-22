// node官方内置的工具
const crypto = require('crypto')

//给需要加密的内容增加前缀或后缀，提升安全性
// crypto.createHash('md5').update('xxx').digest('hex')

// update对传入字符加密，digest选择加密算法，也可以双层加密
module.exports = str => crypto.createHash('md5').update('lcc' + str).digest('hex')