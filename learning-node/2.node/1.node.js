// node 1.node.js --port 3000 --color red
console.log(process.argv);
let args = process.argv.slice(2);
// 把用户传入的参数变成一个对象
let obj = {};
for(let i = 0; i < args.length; i++) {
  let current = args[i];
  if (current.includes('--')) {
    obj[current.slice(2)] = args[i + 1];
  }
}
console.log(obj);

let result = args.reduce((prev, next, index, arr)=> {
  if (next.includes('--')) {
    prev[next.slice(2)] = arr[index + 1];
  } 
  return prev;
}, {});
console.log(result);