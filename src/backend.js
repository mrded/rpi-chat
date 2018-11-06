const Express = require('express');
const Socket = require('socket.io');

const app = Express();

app.use(Express.static(__dirname + '/build'));

const server = app.listen(5000, () => {
  console.log('server is running on port 5000')
});

const io = Socket(server);

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('SEND_MESSAGE', (data) => {
    io.emit('RECEIVE_MESSAGE', data);
  })
});
