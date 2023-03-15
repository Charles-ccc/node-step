const { UserModel } = require('../model')
const { createToken } = require('../util/jwt')
const fs = require('fs')
const { promisify } = require('util')
// 方法异步化操作
const rename = promisify(fs.rename)

exports.register = async (req, res) => {
  // 获取模型
  const userModel = new UserModel(req.body)
  // 保存模型数据，拿到数据库返回结果
  const dbResult = await userModel.save()
  const tempUser = dbResult.toJSON()
  // 保存后返回的是完整的数据结构，手动删除passwords
  delete tempUser.password 
  res.status(201).json(tempUser)
}

exports.login = async (req, res) => {
  // 客户端数据验证, 链接数据库查询  
  let dbResult = await UserModel.findOne(req.body)
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

exports.update = async (req, res) => {
  // jwt中验证token后写入到req里
  // findByIdAndUpdate 根据_id来修改数据，第三个参数是获取更新后的数据
  const dbResult = await UserModel.findByIdAndUpdate(req.user.userInfo._id, req.body, { new: true })

  res.status(202).json({user: dbResult})
}

// 用户头像上传
exports.avatar = async (req, res) => {
  console.log(req.file)
  /**
   * {
      fieldname: 'avatar',
      originalname: 'WechatIMG5.jpeg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: 'public/',
      filename: '6f3a85be853bc29930d8b1671dae3951',
      path: 'public/6f3a85be853bc29930d8b1671dae3951',
      size: 104947
    }
   */
  const filrArr = req.file.originalname.split('.')
  // 获取文件后缀名
  const filetype = filrArr[filrArr.length - 1]
  // 文件实际路径
  const filename = './public/' + req.file.filename 
  try {
    // 文件重命名
    rename(filename, filename + '.' + filetype)
    res.status(201).json({filepath: req.file.filename + '.' + filetype})
  } catch (error) {
    res.status(500).json({err: error})
  }
} 