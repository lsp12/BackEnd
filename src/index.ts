import app from './app';
import './database';
import { Server as WebSocket } from 'socket.io';
import http from 'http';

const server = http.createServer(app);
const io = new WebSocket(server);

io.on('connection', () => {
  console.log('new connection');
});

server.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
