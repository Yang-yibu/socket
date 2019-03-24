
const ws = require('nodejs-websocket');

const config = {
  PORT: 3000
};

ws.createServer(function (conn) {
  console.log('< --- New connection --- >');
  conn.on('text', function (str) {
    console.log('Received: \n', str);
    conn.sendText(str.toUpperCase() + ' !!!');
  })

  conn.on('close', function (code, reason) {
    console.log('< --- Connection closed --- >');
    console.log('code: \n', code);
    console.log('reason: \n', reason);
  })

  conn.on('error', function (err) {
    console.log('< --- connection ERR --- >');
    console.log(err);
  })
}).listen(config.PORT);
console.log('Service is running at ' + config.PORT);