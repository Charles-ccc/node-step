// 读取文件和写入文件

const fs = require('fs')
const { promisify } = require('util')
// 功能promise化
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

exports.getDb = async () => {
  const data = await readFile('./db.json', 'utf8')
  return JSON.parse(data)
}

exports.setDb = async (data) => {
  const stringData = JSON.stringify(data)
  return await writeFile('./db.json', string)
}