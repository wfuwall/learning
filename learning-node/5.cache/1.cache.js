// http的缓存分为两种  强制缓存(首页没办法强制缓存) 和  对比缓存
// 强制缓存的缺点: 如果文件更改了，可能导致返回的还是之前的内容
let http = require('http');
let url = require('url');
let fs = require('fs');
let crypto = require('crypto');
let path = require('path');


let server = http.createServer((req, res) => {
  let {pathname} = url.parse(req.url, true);
  let absPath = path.join(__dirname, pathname);
  // 设置强制缓存
  // res.setHeader('Cache-Control', 'max-age=10');
  // res.setHeader('Expires', new Date(Date.now() + 10000).toGMTString());

  fs.stat(absPath, (err, statObj) => {
    if (err) {
      res.statusCode = 404;
      res.end('page not found!')
      return;
    }
    if (statObj.isFile()) { // 如果是文件 http://localhost:3000/index.html
      let md5 = crypto.createHash('md5');
      let rs = fs.createReadStream(absPath);
      let arr = [];
      rs.on('data', function(chunk) {
        arr.push(chunk);
        md5.update(chunk);
      })
      rs.on('end', function() {
        let etag = md5.digest('base64');
        if (req.headers['if-none-match'] === etag) { // 说明内容一样的，没有改变，走缓存
          res.statusCode = 304;
          res.end();
          return;
        }
        res.setHeader('Etag', etag);
        res.end(Buffer.concat(arr));
      })
    } else { // 如果是目录 http://localhost:3000
      let ctime = statObj.ctime.toUTCString();
      if (req.headers['if-modified-since'] === ctime) {
        res.statusCode = 304;
        res.end();
        return;
      }
      res.setHeader('Last-Modified', ctime);
      let filePath = path.join(absPath, 'index.html');
      fs.createReadStream(filePath).pipe(res);
    }
  })
})

server.listen(3000);