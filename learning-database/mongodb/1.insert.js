// 执行这个文件需要 cd 当前目录下执行  mongo 文件名 命令即可
// 链接school数据库 插入100万条数据
let db = connect('school');

let startTimer = Date.now();
let arr = [];  // 定义一个数组最后插入到数据库，会比一条条插入速度快
for(let i = 0; i < 1000000; i++) {
  arr.push({name:'zf', age: i, address: '回龙观'});
  // db.user.insert({name:'zf', age: i, address: '回龙观'})
}
db.user.insert(arr);
print(Date.now() - startTimer);