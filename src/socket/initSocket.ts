import { Express } from 'express';
import https from 'http';
import { Server as WebSocket } from 'socket.io';
import { chatSocket } from './chat/chatSocket';

const initSocket = (app: Express) => {
  const server = https.createServer(app);
  const io = new WebSocket(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      allowedHeaders: ['my-chat'],
      credentials: true,
    },
  });

  chatSocket(io);

  return { server };
};
export default initSocket;
