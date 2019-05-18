### http缓存
- http缓存有两种方式
  - 强制缓存 Cache-Control Expires, 两个都要设置一下，因为老的浏览器可能没有Cache-Control
  ```
  res.setHeader('Cache-Control', 'max-age=10');
  res.setHeader('Expires', new Date(Date.now() + 10000).toGMTString());
  ```
  - 对比缓存 Last-Modified / If-Modified-Since  和 Etag / If-None-Match两种
  ```
  res.setHeader('Last-Modified', ctime); // ctime是文件最后一次更改的时间
  ```
- 强制缓存缺点：如果设置了强制缓存，文件更改了，可能导致返回的还是之前的内容
- Last-Modified对比缓存：如果服务端设置了Last-Modified， 下次浏览器下次请求的时候会带上 If-Modified-Since ，服五段对比一下，如果Last-Modified设置的时间和If-Modified-Since的时间相等，就可以返回304； 
- Last-Modified对比缓存的缺陷： 如果文件改了又改回去了，其实内容没变，但是时间变了，就会有问题
- Etag对比缓存： 是根据文件内容算出来一个md5戳，这种方式比较靠谱，但是比较浪费性能，因为服务端无论走不走缓存都要把文件读取出来。大文件不能使用这种方法，一般使用文件大小 + 文件最后修改时间 来组成这个etag
- 最好的缓存方式是全部都使用： 如果浏览器访问服务端，会先加一个强制缓存，强制缓存5s， 等过了5s后会再次发送请求，对比缓存先判断last-Modified 再判断etag 如果都成立就再强制缓存5s， 如果有变化再返回新的文件

### pwa缓存
- pwa 缓存是离线缓存， 网络不通也可以缓存起来，使用的是cache api