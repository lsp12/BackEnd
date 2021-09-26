import { Server as WebSocket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export const chatSocket = (io: WebSocket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) => {
  let users: { userId: any; socketId: any }[] = [];

  const addUser = (userId: string, socketId: string) => {
    !users.some(user => user.userId === userId) && users.push({ userId, socketId });
  };

  const removeUser = (userId: string) => {
    users = users.filter(user => user.userId !== userId);
  };

  const getUser = (userId: string) => {
    return users.find(user => user.userId === userId);
  };

  io.on('connection', socket => {
    //socket connected
    console.log('new connection:', socket.id);
    //user connected
    socket.on('addUser', userId => {
      console.log(userId);
      addUser(userId, socket.id);
      io.emit('userList', users);
    });
    socket.on('recivide', mesaje => {
      console.log(mesaje.recivide);
    });

    //send and get message
    socket.on('sendMessage', ({ message, senderId, reciveId }) => {
      console.log(message, senderId, reciveId);
      const user = getUser(reciveId);
      if (user) {
        io.to(user.socketId).emit('reciveMessage', { message, senderId });
      }
    });

    socket.emit('ping');

    //user disconnected
    socket.on('disconnect', () => {
      console.log('user disconnected');
      removeUser(socket.id);
      io.emit('userList', users);
    });
  });
};
