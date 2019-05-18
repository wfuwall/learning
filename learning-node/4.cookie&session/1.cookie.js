let http = require('http');
let querystring = require('querystring');

let server = http.createServer((req, res) => {

  if (req.url === '/read') {
    let cookies = querystring.parse(req.headers.cookie, '; ', '=');
    res.end(JSON.stringify(cookies));
  }

  if (req.url === '/write/read') {
    let cookies = querystring.parse(req.headers.cookie, '; ', '=');
    res.end(JSON.stringify(cookies));
  }

  if (req.url === '/write') {
    // res.setHeader('Set-Cookie', ['name=hello', 'age=100']); // 设置多个cookie
    // res.setHeader('Set-Cookie', 'name=hello; Domain=.chudongyang.cn'); // 设置cookie的domain
    // res.setHeader('Set-Cookie', 'name=hello; Path=/write') // 设置cookie的path
    // res.setHeader('Set-Cookie', 'name=hello; Max-Age=10') // 设置cookie的相对时间
    // res.setHeader('Set-Cookie', 'name=hello; Expires='+new Date(Date.now() + 10000).toUTCString()); // 设置cookie的绝对时间
    // httpOnly 一般服务端设置都是true
    res.setHeader('Set-Cookie', 'name=hello; httpOnly=true'); // 设置httpOnly只在服务端生效，但是客户端一样可以改掉
    res.end('set cookie ok!');
  }
})

server.listen(3000);

// 1、更改本地的hosts文件 127.0.0.1 指向 a.chudongyang.cn b.chudongyang.cn
// 2、当在a.chudongyang.cn设置cookie了， 在b.chudongyang.cn是拿不到的, domain默认只针对特定的域
// 3、res.setHeader('Set-Cookie', 'name=hello; domain=.chudongyang.cn'); 这样设置后 两个域名就都可以读到cookie