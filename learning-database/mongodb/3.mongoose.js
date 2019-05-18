// mongoose是基于mongo的语法
let mongoose = require('mongoose'); 

// 创建连接数据库
let conn = mongoose.createConnection('mongodb://127.0.0.1:27017/school', {
  useNewUrlParser: true
})

// 创建集合的骨架 起到了限制作用
let UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  age: Number
})

// 创建一个模型， 模型具有增删改查的功能 这是创建的User模型会变成users(大写变成小写，单数变成复数), 如果不想让更改，可以在创建集合的骨架时候传入第二个参数 {collection: 'User'}
let User = conn.model('User', UserSchema);

// 增加数据 支持promise async + await
;(async function() {
  let r = await User.create({username: '张三', password: '123456', age: 18})
  console.log(r);
})();