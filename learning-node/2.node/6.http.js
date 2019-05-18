let http = require('http');
let querystring = require('querystring'); // 解析和格式化 URL 查询字符串
console.log(querystring.escape('hello'));
// 请求分为三部分 (1) 请求行  方法 路径 协议
//              (2) 请求头  浏览器信息 + 自定义
//              (3) 请求体  需要on('data)来接收数据
// request 是可读流  response 是可写流

// 响应也分为三部分 (1) 响应行 常见的状态码  200 204(没有响应体) 206(范围请求) 301(永久重定向) 302(临时重定向) 304(缓存) 401(没权限) 403(登陆了还是没权限) 404 500(服务端挂了)
//                (2) 响应头
//                (3) 响应体
let server = http.createServer(function(request, response){
  // request 中存放的内容
  console.log(request.url); // 请求的路径 端口号后面的，但不包含hash
  console.log(request.method); // 请求的方法名
  console.log(request.httpVersion); // HTTP 版本
  console.log(request.headers); // 请求头，所有的属性名都是小写的

  // 请求的post方法
  let data = [];
  request.on('data', function(chunk) {
    data.push(chunk);
  })
  request.on('end', function () { // 不管有没有请求体，都会触发end事件
    let str = Buffer.concat(data).toString();
    let obj = {};
    str.replace(/([^&+?#]*)=([^&+?#]*)/g, function() {
      obj[arguments[1]] = arguments[2];
    })
    response.statusCode = 200; // 设置状态码
    response.setHeader();// 设置响应头
     // respones 响应的内容，会立刻把结果响应回去
    response.end(JSON.stringify(obj));
  })
})

server.listen(4000);

// nodemon 只要文件发生变化，就能重启服务
// curl -X POST -d "username=123&password=456" http://localhost:4000
