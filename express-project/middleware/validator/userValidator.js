// 验证参数合法性
const { body } = require('express-validator')
const validate = require('./errorback')
const { UserModel } = require('../../model')

module.exports.register = validate([
  // notEmpty校验规则，withMessage自定义验证消息, bail验证通过才往下执行
  body('username')
    .notEmpty().withMessage('用户名不能为空').bail()
    .isLength({min: 6}).withMessage('用户名长度不能小于6位').bail(),
  body('email')
    .notEmpty().withMessage('邮箱不能为空').bail()
    .isEmail().withMessage('邮箱不合法').bail()
    // 自定义规则
    .custom(async value => {
      const emailValidate = await UserModel.findOne({email: value})
      if (emailValidate) {
        return Promise.reject('邮箱已被注册')
      }
    }).bail(),
  body('phone')
    .custom(async value => {
      const phoneValidate = await UserModel.findOne({phone: value})
      if (phoneValidate) {
        return Promise.reject('手机号已被注册')
      }
    }).bail(),
  body('password')
    .notEmpty().withMessage('密码不能为空').bail()
    .isLength({min: 6}).withMessage('密码长度不能小于6位').bail(),
])

module.exports.login = validate([
  body('email')
    .notEmpty().withMessage('邮箱不能为空').bail()
    .isEmail().withMessage('邮箱不合法').bail()
    .custom(async value => {
      const emailValidate = await UserModel.findOne({email: value})
      if (!emailValidate) {
        return Promise.reject('邮箱未注册')
      }
    }).bail(),
  body('password')
    .notEmpty().withMessage('密码不能为空').bail()
])

module.exports.update = validate([
  body('email')
    .custom(async value => {
      const emailValidate = await UserModel.findOne({email: value})
      if (emailValidate) {
        return Promise.reject('邮箱已经被注册')
      }
    }).bail(),
  body('username')
    .custom(async value => {
      const userValidate = await UserModel.findOne({username: value})
      if (userValidate) {
        return Promise.reject('用户名已经被注册')
      }
    }).bail(),
  body('phone')
    .custom(async value => {
      const phoneValidate = await UserModel.findOne({phone: value})
      if (phoneValidate) {
        return Promise.reject('手机号已经被注册')
      }
    }).bail(),
])