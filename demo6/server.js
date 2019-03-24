
const app = require('http').createServer();
const io = require('socket.io')(app);

const config = {
  PORT: 3000
};

app.listen(config.PORT);

// 给每个客户端分配名字
var clientCount = 0;

io.on('connection', function (socket) {
  clientCount++;

  socket.nickName = 'user ' + clientCount;
  // io.emit 广播；socket.emit 向当前客户端发送消息
  io.emit('enter', socket.nickName + 'come in');

  socket.on('message', function (str) {
    io.emit('message', socket.nickName + ' say: ' + str);
  })

  socket.on('disconnect', function () {
    io.emit('leave', socket.nickName + ' left');
  })
})

console.log('Service is running at ' + config.PORT);
