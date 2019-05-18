### 浏览器的事件环
- 代码从上到下依次执行， 会先执行同步，再执行异步
- 宏任务 mac（慢）和微任务 mic（快）
  - 宏任务： setTimeout()、setInterval()、setImmediate()、MessageChannel、node的I/O
  - 微任务： promise.then()、process.nextTick()、MutationObserver  
- 浏览器事件环的执行顺序： 1、代码会先执行同步任务 2、清空队列中的微任务 3、拿出一个到时间的宏任务放到执行栈中执行，这时候如果队列中又有微任务，会再次清空微任务 4、然后继续从队列中拿出一个宏任务放到执行栈中执行....
```
setTimeout(() => {
  console.log('timeout1');
  Promise.resolve().then(() => {
    console.log('then1');
  })
}, 0);
Promise.resolve().then(() => {
  console.log('then2');
  setTimeout(() => {
    console.log('timeout2');
  }, 0);
})
```
> 上面代码的输出--> then2 timeout1 then1 timeout2
```
async function async1() {
  console.log('async1 start');
  await async2();
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(() => {
  console.log('timeout');
}, 0);
async1();
new Promise(function(resolve){
  console.log('promise1');
  resolve();
}).then(function() {
  console.log('promise2');
});
console.log('script end');
```
> （头条面试题）上面代码的输出--> script start、async1 start、async2 、promise1、 script end 、promise2、timeout，这里需要注意的是await fn() 这个fn函数会立即执行，但是await下一行的代码是相当于是在then中执行。
