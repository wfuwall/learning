### rollup.js 
Rollup是JavaScript的模块打包器，可以将小块代码编译成大块复杂的代码。因为Vue是使用Rollup构建的，所以了解Rollup可以帮助看懂Vue的构建配置。
- 全局安装rollup
```
npm install --global rollup
```

### rollup和webpack的区别
- rollup 主要用于构建JavaScript库，也可以用于构建应用程序。
- rollup不支持一些特定的高级功能，比如代码拆分和动态导入。
- webpack更适合去构建应用程序。

### ES6模块和CommonJS哪个更好？
- ES6模块是官方标准，也是JavaScript语言明确的发展方向；CommonJS模块是一种特殊的传统的格式。
- ES6模块允许进行静态分析，实现tree-shaking的优化，并且提供了循环引用和动态绑定等高级功能。
- CommonJS模块输出的是值的拷贝，而ES6模块输出的是值的引用。也就是说一旦CommonJS输出了一个值，模块内部的变化不会影响到这个值。
- CommonJS模块是运行时加载，而ES6模块是编译时输出接口
