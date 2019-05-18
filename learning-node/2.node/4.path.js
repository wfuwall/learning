let vm = require('vm');
let path = require('path');

let data = 'hello world';
// vm.runInThisContext('console.log(data)'); // 会报错

console.log(path.basename('1.js', '.js')); // 1
console.log(path.extname('1.js')); // .js
console.log(path.dirname('a/b/c')); // a/b
console.log(path.join('a/b', '/', 'd/e')); // a/b/d/e
console.log(path.resolve('a/b', '/', 'd/e')); // /d/e