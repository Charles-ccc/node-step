const crypto = require('crypto')

//给需要加密的内容增加前缀或后缀，提升安全性
// crypto.createHash('md5').update('xxx').digest('hex')

module.exports = str => crypto.createHash('md5').update('lcc' + str).digest('hex')