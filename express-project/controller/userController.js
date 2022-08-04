const { User } = require('../model')
const { createToken } = require('../util/jwt')
exports.register = async (req, res) => {
  // 往模型中传入数据
  const userModel = new User(req.body)
  // 保存模型数据
  const dbResult = await userModel.save()
  const tempUser = dbResult.toJSON()
  // 保存后返回的是完整的数据结构，手动删除passwords
  delete tempUser.password 
  res.status(201).json(tempUser)
}

exports.login = async (req, res) => {
  // 客户端数据验证, 链接数据库查询  
  let dbResult = await User.findOne(req.body)
  // 如果查到结果，则生成token
  if (!dbResult) {
    res.status(402).json({error: '邮箱或密码不正确'})
  }
  dbResult = dbResult.toJSON()
  // 登陆成功后记录token
  dbResult.token = await createToken(dbResult)
  res.status(201).json({msg: 'login successed', data: dbResult})
}

exports.list = async (req, res) => {
  console.log(req.method)
  res.send('/user-list')
}

exports.delete = async (req, res) => {
  console.log(req.method)
}
