## node.js学习笔记
- node是让js代码运行在服务端， 基于V8引擎，但是并不包含js全集（BOM, DOM, ECMAScript）
- 计算机分配单位靠的就是进程， 进程中一个环境可以开很多线程。node的api是异步的，底层还是通过多线程来模拟了异步 libuv
- node主要目标是提供一种简单的。用于创建高性能服务器的开发工具
- node 只支持utf8格式的 ，但是可以用iconv-lite 把二进制gbk转化成utf8

### node的事件环
- node事件环中有几个阶段
  - timers  定时器setTimeout执行，将callback加入队列中
  - pending callbacks 执行延迟到下一个循环迭代的I / O回调
  - idle, prepare  仅在内部使用
  - poll 轮询  检索新的I/O事件; 执行与I/O相关的回调 , 比如fs文件操作
  - check  setImmediate的callback执行
  - close callbacks  一些callbacks的关闭，如socket
- process.nextTick比promise.then快
- setTimeout和setImmediate 的执行顺序不确定，但是如果在fs.reaFile的回调函数中 setImmediate 一定在 setTimeout的前面
```
setTimeout(() => {
  console.log('timeout1');
  process.nextTick(() => {
    console.log('nextTick1');
  })
})
console.log('start');
process.nextTick(() => {
  console.log('nextTick2');
  setTimeout(() => {
    console.log('timeout2');
  })
})
```
> 上题中的输出结果是--> start nextTick2 timeout1,  在node 10版本可能会出现timeout2 和 nextTick1的执行顺序不确定， 但是在node 11版本 nextTick1 在timeout2之前，向浏览器靠拢

### node常见的属性 global
- console.log(global, {showHidden: true}) 可以看到隐藏的属性
- process 进程 （当前运行的环境）
  - process.cwd() 当前文件的工作目录
  - process.env   当前的运行环境 webpack的开发环境和生产环境就是使用这个判断的（window使用set， mac使用export可以设置变量）
  - process.argv  获取当前node文件时用户传入的参数 
  - process.nextTick 下一队列
- Buffer 读取的内容都是二进制的， buffer主要是内存和缓存，是十六进制的（可以和字符串相互转化）
- clearImmediate setImmediate 只有ie浏览器中才有，node实现了这个方法
- eval decode encode 等
- exports module require __dirname __filename 不是global的属性，但是也是全局变量，这是node实现commonjs模块化包了一个自执行函数

> 这里需要注意的是在.js文件中打印this是一个{}, 这是因为node的文件默认会在外面套一层函数。可以在node.js的 REPL(交互式解析器,一个电脑的环境) 中打印this，就是global了。在命令行输入node回车即可进入repl环境

### Buffer（不要用new） 缓存
- parseInt('11111111', 2); 把二进制转化成十进制
- (255).toString(8); 十进制转化成八进制（这个方法可以任意进制转化成任意进制）
- Buffer.from(); 把字符串转化成buffer16进制
- Buffer.alloc(size[, fill[, encoding]]); 创建buffer size是buffer的长度
- Buffer.from(array); 使用字节数组创建buffer
- Buffer 拥有数组的方法，forEach、slice、length(字节的长度)
- buffer 一旦声明，就不能增加长度。但是我们可以创建一个更大的buffer，把小的buffer放进去。 buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]]) 把 buf拷贝到target中，targetStart：target 中开始写入的偏移量，默认0；sourceStart： buf 中开始拷贝的偏移量，默认0；sourceEnd：buf 中结束拷贝的偏移量，默认为 buf.length。
- Buffer.concat(list[, totalLength]) 合并buffer list：要合并的buffer， totalLength：合并后buffer的总长度

### node常用的模块
- vm 核心模块 可以提供一个沙箱环境运行代码
  - vm.runInThisContext();
- path 核心模块 处理文件路径的  
  - path.basename(path[, ext]) 获取基础路径， 第二个参数可以指定后缀
  ```
  path.basename('index.js'); // index.js
  path.basename('index.js', '.html'); // index
  ```
  - path.extname(path); 获取扩展名
  ```
  path.extname('index.js'); // .js
  ```
  - path.dirname(path); 获取父级的路径
  ```
  path.dirname('/foo/bar/baz/asdf/quux'); // /foo/bar/baz/asdf
  ```
  - path.join()和path.resolve();
  ```
  path.join('a/b', '../', 'd/e'); // a/d/e
  path.resolve('a/b', '../', 'd/e'); // 绝对路径/a/d/e
  ```
  > resolve拼接的时候不能有/, 如果有会找到根路径
- fs 核心模块 文件系统  
  - fs.readFile((path[, options], callback) 读取文件 （读取64k以下的文件）
  - fs.writeFile(file, data[, options], callback) 写入文件
  - fs.exists(path, callback) 判断路径存在不存在（废弃）
  - fs.access(path[, mode], callback) 判断路径存在不存在(符合node的规范，不存在报错)
  - fs.stat(path[, options], callback) 判断是否是文件还是文件夹 statObj.isDirectory() 判断是否是文件夹， statObj.isFile() 判断是否是文件
  - fs.createReadStream(path[, options]) 创建一个可读流
  - fs.createWriteStream(createWriteStream) 创建一个可写流
- http 核心模块 服务器和客户端  
- querystring 核心模块 解析和格式化 URL 查询字符串
  - querystring.parse(str[, sep[, eq[, options]]]) str: 需要被解析的字符串 sep: 分隔键值对以什么符号分隔，默认&  eq: 键和值以什么符号分隔，默认=
  - querystring.stringify(obj[, sep[, eq[, options]]])
  - querystring.escape(str)
  - querystring.unescape(str)
- url 核心模块 解析路径的
  - url.parse('http://localhost:3000/index?a=1&b=2', true); // 可以将字符串解析成一个对象  true参数可以将query转成对象
- crypto 核心模块  为了提供通用的加密和哈希算法
  - md5的特点： (1) 相同的内容， 摘要后是相同的; (2) 不同的内容， 摘要出的结果完全不同; (3) 不同的内容摘要出来长度是一样的; (4) 摘要不可逆
  ```
    let str1 = crypto.createHash('md5').update('1234567890').digest('base64');
    let str2 = crypto.createHash('md5').update('12345').digest('base64');
  ```
- mime 第三方模块 判断请求的文件类型
  - mime.getType(path) 根据文件路径返回正确的文件类型， 用法设置响应头的Content-Type类型：res.setHeader('Content-Type', `${mime.getType(path)};charset=utf-8`);
- mz 第三方模块  可以将回调转化成promise  
- uuid 第三方模块  可以生成唯一的id号
- ejs 第三方模块 模板引擎
- methods 第三方模块 里面存放了所有的方法