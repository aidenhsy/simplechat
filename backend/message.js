const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', (socket) => {
  console.log('New WS connection....');
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message });
  });
});
