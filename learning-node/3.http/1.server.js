// 创建一个服务端
let http = require('http');
let querystring = require('querystring'); 
let url = require('url'); // 解析url路径的

let server = http.createServer((req,res) => {
  let urlObj = url.parse(req.url, true);
  console.log(urlObj);
  let method = req.method.toLowerCase();
  console.log(method); // 请求的方法

  // 获取请求体
  let data = [];
  req.on('data', function(chunk) {
    data.push(chunk);
  })
  req.on('end', function() {
    let str = Buffer.concat(data).toString();
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      let obj = querystring.parse(str);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(obj));
    }
  })
})
server.listen(3000);