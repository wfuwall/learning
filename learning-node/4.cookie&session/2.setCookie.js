let http = require('http');
let querystring = require('querystring');
let crypto = require('crypto');
let screct = 'hello';
let signCookie = (value) => {
  return crypto.createHmac('sha256', screct).update(value.toString()).digest('base64').replace(/[+/]/g,'');
}
let server = http.createServer((req, res)=> {
  // 封装一个类似于express里的setCookie、getCookie方法
  let cookies = [];
  res.setCookie = function(key, value, options={}){
    let optionsCookies = [];
    if (options.maxAge){
      optionsCookies.push(`Max-Age=${options.maxAge}`);
    }
    if (options.path) {
      optionsCookies.push(`Path=${options.path}`);
    }
    if (options.domain) {
      optionsCookies.push(`Domain=${options.domain}`);
    }
    if (options.expires) {
      optionsCookies.push(`Expires=${options.expires}`);
    }
    if (options.httpOnly) {
      optionsCookies.push(`httpOnly=true`);
    }
    if (options.signed) {
      value = value + '.' + signCookie(value);
    }
    cookies.push(`${key}=${value}; ` + optionsCookies.join('; '));
    res.setHeader('Set-Cookie', cookies);
  }
  req.getCookie = function(key) {
    let cookies = querystring.parse(req.headers.cookie, '; ', '=');
    return cookies[key];
  }
  req.getSignCookie = function(key) {
    let cookies = querystring.parse(req.headers.cookie, '; ', '=');
    if (cookies[key]) {
      let [value, signValue] =  cookies[key].split('.');
      if (signCookie(value) === signValue) {
        return value;
      }
    } 
    return '';
  } 
  if (req.url === '/read') {
    let name = req.getSignCookie('name');
    let age = req.getCookie('age');
    res.end(JSON.stringify({name, age}));
  }
  if (req.url === '/write/read') {
    let name = req.getCookie('name');
    let age = req.getCookie('age');
    res.end(JSON.stringify({name, age}));
  }

  if (req.url === '/write') {
    res.setCookie('name', 'hello', {httpOnly: true, signed: true});
    res.setCookie('age', '100', {httpOnly: true});
    res.end('set cookie ok!');
  }
})
server.listen(3000);

// 设置httpOnly也不能防止cookie在客户端被篡改， 所以服务端一般使用签名，就是给cookie标个记号， 下次客户端需要带上记号和内容，就可以确认这个cookie有没有被篡改