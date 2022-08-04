const { validationResult } = require('express-validator')

module.exports = validator => {
  return async (req, res, next) => {
    // 遍历所有的验证规则
    await Promise.all(validator.map(validate => validate.run(req)))

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(401).json({error: errors.array()})
    }
    // 没有错误则继续执行下面中间件
    next()
    }
}