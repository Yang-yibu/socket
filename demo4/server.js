
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

  var msg = {};
  msg.type = 'enter';
  msg.data = conn.nickName + 'come in';
  broadcast( JSON.stringify(msg) );

  conn.on('text', function (str) {
    console.log('Received: \n', str);

    var msg = {};
    msg.type = 'message';
    msg.data = conn.nickName + ' say: ' +  str;
    broadcast( JSON.stringify(msg) );
  })

  conn.on('close', function (code, reason) {
    console.log('< --- Connection closed --- >');
    console.log('code: \n', code);

    var msg = {};
    msg.type = 'leave';
    msg.data = conn.nickName + 'left';
    broadcast( JSON.stringify(msg) );
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