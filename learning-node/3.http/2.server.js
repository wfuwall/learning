// 判断请求的路径，返回正确的静态文件， 没有则返回404
let http = require('http');
let url = require('url');
let fs = require('fs');
let path = require('path');
let mime = require('mime');


let server = http.createServer((req, res)=> {
  let {pathname} = url.parse(req.url);
  console.log(pathname);
  // 获取绝对路径 这里不能使用resolve拼接，因为其碰到 / 会返回根目录
  let absPath = path.join(__dirname, pathname);
  fs.stat(absPath, function(err, statObj){
    // 报错说明， 文件或者文件夹不存在
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain;charset=utf-8');
      res.end('您访问的页面不存在');
      return;
    }
    // 判断访问的是不是文件, 如果是文件则读取返回
    if (statObj.isFile()) {
      res.setHeader('Content-Type', `${mime.getType(absPath)};chaset=utf-8`);
      fs.createReadStream(absPath).pipe(res);
    } else { // 如果是文件夹, 则去文件夹下找index.html
      let realPath = path.join(absPath, 'index.html');
      // 判断文件夹下是否有index.html文件
      fs.access(realPath, (err)=> {
        if (err) { // 如果报错，则说明index.html文件不存在
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain;charset=utf-8');
          res.end('您访问的页面不存在');
          return;
        }
        // 如果index.html文件存在，则读取后返回
        res.setHeader('Content-Type', `${mime.getType(realPath)};chaset=utf-8`);
        fs.createReadStream(realPath).pipe(res);
      })
    }
  })
});
server.listen(3000);

// 测试 http://localhost:3000   http://localhost:3000/home  http://localhost:3000/study