let fs = require('fs');
let path =require('path');

// 可读流  返回的是可读流的实例
let rs = fs.createReadStream(path.resolve(__dirname, 'name.txt'), {
  flags: 'r', // 
  highWaterMark: 3, // 每次读取多少 默认64k
  encoding: null,
  autoClose: true, // 读取完毕后，是否关闭文件
  start: 0,
  end: 5
})
// 流， 默认是暂停模式， 非流动模式 内部会监听你有没有监听data事件 
let arr = [];
rs.on('data', function(chunk) {
  arr.push(chunk);
  rs.pause(); // 暂停data事件的触发
});

rs.on('end', function() {
  console.log('读取完毕', Buffer.concat(arr).toString());
})

rs.on('error', function(err) {
  console.log(err);
})

setTimeout(() => {
  rs.resume(); // 恢复data事件的触发
}, 1000);

// 可写流 文件不存在则创建， 如果有内容则清空内容
let ws = fs.createWriteStream(path.resolve(__dirname, 'age.txt'), {
  falgs: 'w',
  encoding: 'utf8',
  highWaterMark: 5, // 每次预计写入多少 默认16k
  autoClose: true,
  start: 0
});
// 写入的内容必须是 buffer或者字符串 当前写入的内容超过了highWaterMark则返回false， 否则返回true
let flag = ws.write('123', function(err) {
  console.log('写入成功', err);
})
console.log(flag);
ws.end('写入结束'); // 已经结束了，就不能再写入了