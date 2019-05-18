### mongodb
- MongoDB是一个基于分布式文件存储的开源数据库系统

### mongodb在mac上的安装
- 先安装homebrew 
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
- 使用homebrew安装mongodb
```
  brew install mongodb
```

### 链接mongod数据库
- 查看mongo安装路径    which mongo
- 查看mongo默认的配置文件 cat /usr/local/etc/mongod.conf
- 指定启动目录  sudo mongod --dbpath=/data/db , sudo mongod 命令默认会去找mac上的/data/db
- sudo mongod& 可以让mongo跑在后台
- sudo lsof -i:27017 查看当前mongo运行的进程
- sudo kill -9 port 杀掉进程

### mongo客户端数据库操作
- mongo 打开客户端
- show dbs;  显示所有的库
- use 库名    切换库， 没有的话就创建
- db         查看当前使用的库名
- db.dropDatabase() 删除数据库
- show collections; 显示当前库中的集合
- db.createCollection('user')  创建user集合 （下面都以操作user集合为例）
- db.user.find()   在user集合中查找
  - db.user.find({_id: {$in: [8, 9]}}) 查找_id是8和9 的数据
  - db.user.find({_id:{$not:{$in:[8,9]}}}) 查找_id除了8和9 的数据
  - db.user.find({_id:{$not:{$in:[8,9]}}})
  - $lt 小于，$gt 大于，$lte 小于等于
  - db.user.find({_id: {$lt: 8, $gt: 3}}, {name: 1}) 查询大于3小于8的name， 1表示出现 0 表示不出现
  - db.user.find({arr: {$all:[1, 2]}}) 查询数据中arr数组中包含1和2
  - db.user.find({arr: {$in:[1, 2]}}) 查询数据中arr数组中包含1或者包含2
  - db.user.find({$where: "this._id > 2 && this._id < 8"}) 查找_id大于2并且小于8的数据，但是不建议这种写法，因为效率太低（上面其他写法是根据游标去查的，但是这种写法是去数据库一个一个去比对的）
- db.user.drop()   删除user集合
- db.user.insert({name:'zf'})  往user中插入一条数据， 如果集合不存在则创建
- db.user.save({_id: 1, name: 'zf'}) _id是唯一的，如果传了就用传的，没传的话mongo会自己生成一个，如果要传入的数据_id在集合中存在，则用save方法， insert()方法会报错
- db.user.update(query, updateObj, {multi: Boolean, upsert: Boolean}) 更新数据
  - query 是查询的条件， 如果查询条件不存在，则可以使用upset直接插入一条
  - updateObj 更新后的对象或指定一些更新的操作符  $set直接指定更新后的值， $inc在原基础上累加，$unset取消设置, $push给数组末尾添加一项， $pop删除数组的最后一项， $addToSet如果数组中没有则添加
  - multi 可选，mongodb 默认只更新找到的第一条记录，如果这个参数为true,就更新所有符合条件的记录。
  - upsert 可选，这个参数的意思是，如果不存在符合条件的记录时是否插入updateObj. 默认是false,不插入
- db.user.remove({name:'zf'}) 删除， 默认会把匹配到的全部删除
  - db.user.remove({name:'zf'}, {justOne: true}) 删除一条

### mongo中的索引
- 设置索引的时候要保证这个字段的内容是唯一的 二分查找 （不适合在频繁更新的字段中使用）
- 给age字段设置索引 db.users.ensureIndex({age:1}); 可以设置1 或者-1

### 备份数据库和恢复数据库
- mongodump  备份数据库
  -- host 127.0.0.1 域名
  -- port 27017 端口号
  -- out D:/databack/backup 输出目录
  -- collection mycollection  集合名字
  -- db test 数据库名字
  -- username  用户名
  -- password  密码
- mongorestore + 路径 恢复数据库
  --host
  --port
  --username
  --password

### 分页
- db.user.find().limit(pageSize).skip((currentPage-1)*pageSize) pageSize是每页显示多少条数据， currentPage是当前是第几页，limit()是限制查找多少条，skip()是跳过多少条

### 数据库权限
- 创建用户  db.createUser({user:'cdy',pwd:'123456',roles:[{role: 'readWrite', db: 'school'}]})  user用户名， pwd密码， roles规则
- 查询用户  db.system.users.find();
- 删除用户  db.system.users.remove({user:'zfpx'});
- 启动数据库权限检查  mongod --auth
- 使用账号密码登录数据库  mongo  -u cdy -p 123456 127.0.0.1:27017/admin
- 也可以 use admin 集合，使用db.auth(user, pwd)验证一下，结果是1就是验证通过， 0就是没有通过