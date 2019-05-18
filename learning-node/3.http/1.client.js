// 创建一个客户端
let http = require('http');

let client = http.request({
  hostname: 'localhost', // 主机名
  port: 3000,
  path: '/index?a=1&b=2',
  method: 'post',
  headers: { // 请求头
    token: 123,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}, (response) => {
  response.on('data', function(chunk) { // 因为返回的数据量比较小，所以就不用拼接了
    if (response.headers['content-type'] === 'application/json') {
      console.log(JSON.parse(chunk));
    }
  })
})

client.end('name=hello&password=world');
// node写客户端的两种场景，（1）爬虫 （2）中间层