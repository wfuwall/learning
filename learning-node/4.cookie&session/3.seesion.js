let http = require('http');
let querystring = require('querystring');
let uuid = require('uuid');

let hotelId = 'xianggelila'; // 起一个饭店的名字
let session = {}; //存放用户和信息的映射表， 一般存在数据库 redis/mongo
// 原理就是用唯一标识 去服务端找映射关系
// 使用场景  用户登录（session && jwt）
let server = http.createServer((req, res) => {
  if (req.url === '/hotel') {
    let cookies = querystring.parse(req.headers.cookie, '; ', '=');
    let userId = cookies[hotelId];
    if (userId && session[userId]) {
      session[userId].money -= 10;
      res.setHeader('Content-Type', 'text/html;charset=utf-8');
      res.end(`您当前在香格里拉的会员余额还剩${session[userId].money}元`);
    } else { // 相当于第一次
      let cardId = uuid.v4();
      res.setHeader('Set-Cookie', `${hotelId}=${cardId}; httpOnly=true`);
      session[cardId] = {
        money: 1000
      }
      res.setHeader('Content-Type', 'text/html;charset=utf-8');
      res.end(`您当前在香格里拉的会员余额还剩${session[cardId].money}元`);
    }
  } 
})

server.listen(3000);