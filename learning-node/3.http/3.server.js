// 在2.server.js的基础上进行封装， 并新增了接口请求，跨域的解决办法
let http = require('http');
let url = require('url');
let fs = require('fs');
let path = require('path');
let mime = require('mime');

// 协议、主机名、端口号有一个不一样就是跨域了
class Server{
  // 处理请求
  async handleRequest(req,res) {
    let {pathname} = url.parse(req.url, true);
    let absPath = path.join(__dirname, pathname);
    // 先判断是否调用的是接口 在接口中判断对应的方法名
    let method = req.method.toLowerCase();
    // 允许跨域的域名，如果origin 设置为 * 的话，就不允许强制携带cookie
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS'); // 允许跨域的方法
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, token'); // 允许你的跨域头
    res.setHeader('Access-Control-Max-Age', '10'); // options请求发送的时间间隔, 测试这个属性的时候一定要关闭浏览器的强制清除缓存
    res.setHeader('Access-Control-Allow-Credentials', true);// 允许前端访问携带cookie
    // 下面这个判断是防止请求为options的时候，一直处于pending等待态
    console.log(req.headers);
    if (method === 'options') {
      res.end();
    }
    switch(pathname) {
      case '/userlist': 
      if (method === 'get') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify([{name: 'Tim'}, {name: 'admin'}]));
      }
      if (method === 'put') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({method: `当前的请求是${method}请求`}));
      }
      return;
    }
    try{
      let statObj = await fs.statSync(absPath);
      if (statObj.isFile()) {
        console.log(1);
        this.sendFile(res, absPath);
      } else {
        let realPath = path.join(absPath, 'index.html');
        // accessSync可访问性检查失败，则抛出 Error。 否则，该方法将返回 undefined
        await fs.accessSync(realPath); 
        this.sendFile(res,realPath);
      }
    }catch(e) {
      this.sendError(res, e);
    }
  }
  // 发送文件
  sendFile(res, path) {
    res.setHeader('Content-Type', `${mime.getType(path)};charset=utf-8`);
    fs.createReadStream(path).pipe(res);
  }
  // 发送错误
  sendError(res, err) {
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.statusCode = 404;
    res.end('您访问的页面不存在')
  }
  // 启动服务的函数
  start(port, ...args) {
    let server = http.createServer(this.handleRequest.bind(this));
    server.listen(port, ...args);
  }
}

let server = new Server();
server.start(3000, ()=> {
  console.log('服务已启动');
})