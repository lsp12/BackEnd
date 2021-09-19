import app from './app';
import './database';
import { Server as WebSocket } from 'socket.io';
import https from 'http';

const server = https.createServer(app);
const io = new WebSocket(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

io.on('connection', socket => {
  console.log('new connection:', socket.id);

  socket.emit('ping');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
