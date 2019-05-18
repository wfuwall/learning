
let buffer1 = Buffer.from('哈哈');
console.log(buffer1);
console.log(buffer1.length);
let buffer2 = Buffer.alloc(3);
console.log(buffer2);
let buffer3 = Buffer.from([255, 255, 255]);
console.log(buffer3);

let b1 = Buffer.from ('哈');
let b2 = Buffer.from ('哈');
let b3 = Buffer.alloc(6);
b1.copy(b3);
b2.copy(b3, 3);
console.log(b3);
console.log(Buffer.concat([b1, b2]));

Buffer.myConcat = function(list, length) {
  let totalLength = list.reduce((prev, next) => {
    return prev + next.length;
  }, 0);
  length = length ? length : totalLength;
  let buffer = Buffer.alloc(length);
  let startIndex = 0;
  for (let i = 0; i <list.length; i++ ) {
    let current = list[i];
    current.copy(buffer, startIndex, 0, current.length);
    startIndex += current.length;
  }
  return buffer;
}
console.log(Buffer.myConcat([b1, b2]));
