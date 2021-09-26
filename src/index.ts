import app from './app';
import './database';
import { Server as WebSocket } from 'socket.io';
import https from 'http';
import { chatSocket } from './socket/chat/chatSocket';
import initSocket from './socket/initSocket';

const server = initSocket(app);

server.server.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
