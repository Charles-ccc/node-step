const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb://127.0.0.1:27017')

const clientFn = async (c) => {
  // 链接
  await client.connect()
  // 连接到库
  const db = client.db('onedb')
  // 连接到集合
  return db.collection(c)
}

const main = async () => {
  const cc = await clientFn('collection')
  // 查找，res包含很多方法
  // const res = await cc.find()
  // 添加
  const d = await cc.insertOne({username: 'wuwu', age: 80})
  console.log(d)
  // console.log(await res.toArray())
}
// 需要手动断开链接
main().finally(() => {
  client.close()
})

// 增删改查
//db.collection.insertOne({username: 'wowo', age: 12})
//db.collection.insertMany([{username: 'wo', age: 12},{username: 'ccc', age: 22}])

//db.collection.find({age: {$gt: 15}})
//db.collection.findOne({age: {$gt: 21}})

//db.collection.update({username: 'wo'}, {$set: {age: 50}})
//db.collection.updateMany({age: {$gt: 8}}, {$set: {username: 'onlyone'}})

//db.collection.deleteOne({age: 22})
//db.collection.deleteOne({age: {$gt: 8}})
//db.collection.deleteMany({age: {$gt: 8}})