const app = require('./app');
const server = require('http').createServer(app);
const socketio = require('socket.io');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

dotenv.config();
connectDB();

const io = socketio(server, {
  serveClient: false,
});

io.on('connection', (socket) => {
  console.log('connected!!!!!!!!!!');
  socket.on('join', ({ name, room }, cb) => {
    const { user } = addUser({ id: socket.id, name, room });

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}`,
    });
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name}, has joined!` });

    socket.join(user.room);

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    cb();
  });

  socket.on('sendMessage', (message, cb) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', { room: user.room, text: message });

    cb();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} has left.`,
      });
    }
    console.log('User had left!!');
  });

  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message });
  });
});

server.listen(4000, '0.0.0.0', () =>
  console.log('Server running on port 4000')
);
