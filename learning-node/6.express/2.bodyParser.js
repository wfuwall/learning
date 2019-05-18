let express = require('express');
let bodyParser = require('body-parser');

let app = express();
// bodyParser.json() 方法的实现
function json() {
  return function(req, res, next){
    let arr = [];
    req.on('data', function(chunk){
      arr.push(chunk);
    })
    req.on('end', function(){
      req.body = JSON.parse(Buffer.concat(arr).toString());
      next();
    })
  }
}
// bodyParser.urlencoded() 方法的实现
function urlencoded(params) {
  return function(req, res, next) {
    let arr = [];
    req.on('data', function(chunk){
      arr.push(chunk);
    })
    req.on('end', function(){
      let str = Buffer.concat(arr).toString();
      let obj = {};
      str.replace(/([^&?+#]*)=([^&?+#]*)/g, function() {
        obj[arguments[1]] = arguments[2];
      })
      req.body = obj;
      next();
    })
  }
}
// parse application/json
// app.use(json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.post('/index', function(req, res) {
  console.log(typeof req.body);
  res.send(req.body);
})

app.listen(3000, function() {
  console.log('3000 port start');
})