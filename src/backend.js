const Express = require('express');
const Socket = require('socket.io');

const app = Express();
const port = process.env.PORT || 5000;

app.use(Express.static(__dirname + '/build'));

const server = app.listen(port, () => {
  console.log(`server is running on port ${port}`)
});

const io = Socket(server);

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('SEND_MESSAGE', (data) => {
    io.emit('RECEIVE_MESSAGE', data);
  })
});
