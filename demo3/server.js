
const ws = require('nodejs-websocket');

const config = {
  PORT: 3000
};

// 给每个客户端分配名字
var clientCount = 0;

var server = ws.createServer(function (conn) {
  console.log('< --- New connection --- >');

  clientCount++;
  conn.nickName = 'User' + clientCount;
  broadcast(conn.nickName + 'come in');

  conn.on('text', function (str) {
    console.log('Received: \n', str);
    broadcast(str);
  })

  conn.on('close', function (code, reason) {
    console.log('< --- Connection closed --- >');
    console.log('code: \n', code);
    console.log('reason: \n', reason);
    broadcast(conn.nickName + 'left');
  })

  conn.on('error', function (err) {
    console.log('< --- connection ERR --- >');
    console.log(err);
  })
}).listen(config.PORT);
console.log('Service is running at ' + config.PORT);

// 广播消息
function broadcast(str) {
  server.connections.forEach(function (conn) {
    conn.sendText(str);
  })
}