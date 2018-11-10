const Express = require('express');
const Socket = require('socket.io');
const PouchDB = require('pouchdb');

const db = new PouchDB('http://localhost:5984/rpi-chat');

const app = Express();
const port = process.env.PORT || 5000;

app.use(Express.static(__dirname + '/build'));

app.get('*', function(req, res) {
  res.sendfile(__dirname + '/build/index.html');
});

const server = app.listen(port, () => {
  console.log(`server is running on port ${port}`)
});

const io = Socket(server);

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('SEND_MESSAGE', (data) => {
    io.emit('RECEIVE_MESSAGE', data);

    // Save message into database.
    db.post(data);
  })
});
