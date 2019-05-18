let mz = require('mz'); // 第三方模块  不能出现./ ../

console.log(module.paths);// 模块的查找路径
// 第三方模块的查找 根据module.paths 进行查找， 找到后返回找不到向上级查找， 找到文件夹名字相同后，查找package.json 找到对应的入口

// 实现全局命令
// (1) 需要加一个bin配置
// (2) 前面是命令，后面是执行的文件
// (3) 加上 #! /usr/bin/env node 使用node来运行文件

// 发布自己的包到npm官网
// (1) 切换到官方源 npm install nrm -g
// (2) 登录账号 npm addUser
// (3) 发布包   npm publish
//  npm unpublish --force 删除npm包