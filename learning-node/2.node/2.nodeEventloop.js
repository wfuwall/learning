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
// node 10 版本
// start  nextTick2  timeout1  timeout2  nextTick1
// start  nextTick2  timeout1  nextTick1 timeout2
// node 11版本
// start  nextTick2  timeout1  nextTick1 timeout2