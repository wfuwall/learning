### express常用的api
- req.path  请求的路径
- req.query 路径的?后面的参数
- res.send([body]) 可以直接返回任何类型的数据
- res.sendFile(path [, options] [, fn]) 返回文件



### express中间件
- 在请求到路径处理之前，在中间执行的内容，就是中间件
- 在中间件我们可以做一些权限校验、配置一些公共的方法和公共属性，如果不调用next方法，则不会继续向下执行
- 一般中间件都放在路由之前
- 中间件中如果next方法传递了参数了， 就认为这个参数是错误, 会跳过所有的中间件，找最后一个中间件，把err作为最后一个中间件的第一个参数

### express常用的中间件
- body-parser 解析请求体 
```
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
```
- cookie-parser 解析cookie
```
let cookieParser = require('cookie-parser');
app.use(cookieParser());
```
- express-session 
```
let session = require('express-session ');
app.use(session());
```
