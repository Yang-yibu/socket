
## 文件介绍

```bash
demo1/ # 体验 websocket 

demo2/ # 自搭建 websocket 服务器

demo3/ # 实现简单聊天室

demo4/ # 优化传输数据，使用对象传输，分类消息

demo5/ # 测试 Socket.io

demo6/ # 使用 Socket.io 改造聊天室
```

## 总结

允许客户端和服务端建立持久连接

### socket.io

发送数据的时候可以直接发送 JS 对象，避免在发送数据前对对象手动格式化，收到数据后泛解析数据

自定义消息 `io.emit('news', data)`