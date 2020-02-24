const WebSocket = require('ws')
const redis = require('redis')

// 创建 redis 客户端，需要在本地下载并安装redis，启动后方可成功连接 （在 redis-5.0.7/src 目录下使用 redis-server 命令启动数据库）
const client = redis.createClient()
const wss = new WebSocket.Server({ port: 3000 })
// 原生的 websocket 就两个常用的方法 on('message') send()
const clientArr = []
wss.on('connection', function (ws) {
  clientArr.push(ws)
  client.lrange('barrages', 0, -1, function (err, message) {
    message = message.map(item => JSON.parse(item))
    ws.send(JSON.stringify({ type: 'INIT', data: message }))
  })
  ws.on('message', function (message) {
    client.rpush('barrages', message, redis.print)
    clientArr.forEach(w => {
      w.send(JSON.stringify({ type: 'ADD', data: JSON.parse(message) }))
    })
  })
  ws.on('close', function() {
    clientArr = clientArr.filter(item => item !== ws)
  })
})
