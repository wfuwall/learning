// md5 是摘要算法 并不是加密 （因为大家都知道md5算法，可以使用 撞库 推导出，所以也不是很安全了）
//     (1) 相同的内容， 摘要后是相同的
//     (2) 不同的内容， 摘要出的结果完全不同
//     (3) 不同的内容摘要出来长度是一样的
//     (4) 摘要不可逆

let crypto = require('crypto');
// let str1 = crypto.createHash('md5').update('1234567890').digest('base64');
// let str2 = crypto.createHash('md5').update('12345').digest('base64');
// console.log(str1);
// console.log(str2);

// 加盐算法  其实就是设置一个秘钥， 秘钥不同，加密后的结果也不一样
let secret = 'zf';
let str = crypto.createHmac('sha256', secret).update('123456').digest('base64');
console.log(str);