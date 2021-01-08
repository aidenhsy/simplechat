const app = require('./app');
const server = require('http').createServer(app);
const socketio = require('socket.io');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const io = socketio(server);

io.on('connection', (socket) => {
  console.log('New WS connection....');

  socket.on('disconnect', () => {
    console.log('User had left!!');
  });

  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message });
  });
});

server.listen(4000, () => console.log('Server running on port 4000'));
