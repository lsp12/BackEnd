import { Server as WebSocket, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export const chatSocket = (io: WebSocket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) => {
  //almacena los usuarios y se lo asigna a una idSocket
  let socketUser: any = new Array();
  // alamacena los usuarios unicos conectados y guarda las idSocket que tenga un usuario
  let userSocket: any = new Array();
  const saveConexion = (
    userId: string,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
  ) => {
    //guardar user por idSocket
    socketUser[socket.id] = userId;

    //guardar idSocket por user
    if (userSocket[userId] == undefined) {
      userSocket[userId] = new Array();
    }

    const idSocket = getConexion(userId);
    console.log('idSocket----------------------------', idSocket.length);
    if (idSocket.length != 0) {
      console.log('-------------aaaaaaa---------------', idSocket === []);
      idSocket.map((id: string) => {
        if (id != socket.id) {
          userSocket[userId].push(socket.id);
        }
      });
    } else {
      userSocket[userId].push(socket.id);
    }

    console.log('--------------un nuevo usuario se a conectado------------');
    console.log('---------------User por IdSocket---------------');
    console.log(socketUser);

    console.log('---------------idSocket por user---------------');
    console.log(userSocket);

    console.log('---------------Contar los usuarios conectados---------------');
    console.log(Object.keys(userSocket).length);
  };

  const getConexion = (userId: string) => {
    return userSocket[userId];
  };

  io.on('connection', socket => {
    //socket connected
    console.log('new connection:', socket.id);
    //user connected
    socket.on('addUser', userId => {
      if (userId) {
        saveConexion(userId, socket);
      }

      io.emit('userList', userSocket);
    });
    socket.on('recivide', mesaje => {
      console.log(mesaje.recivide);
    });

    //send and get message
    socket.on('sendMessage', ({ message, senderId, reciveId }) => {
      console.log(message, senderId, reciveId);
      const user = getConexion(reciveId);
      if (user) {
        user.map((id: string) => {
          io.to(id).emit('reciveMessage', { message, senderId });
        });
      }
    });

    socket.emit('ping');

    //user disconnected
    socket.on('disconnect', () => {
      console.log('user disconnected');
      // atrapamos el id del usuario por medio objeto array de idSocket
      const userId = userSocket[socketUser[socket.id]];
      let location;
      if (userId) {
        // por medio de un map eliminamos el idSocket del array de idSocket
        userId.map((id: string, index: any) => {
          if (id === socket.id) {
            location = index;
          }
        });

        // eliminamos el idSocket del array del array userSocket
        userSocket[socketUser[socket.id]].splice(location, 1);
        //verificamos si el objeto userSocket tiene le queda algun idSocket
        if (userSocket[socketUser[socket.id]] < 1) {
          // eliminamos el objeto userSocket
          delete userSocket[socketUser[socket.id]];
        }
        // eliminar user por idSocket
        delete socketUser[socket.id];
        console.log('--------------desconccion de usuario------------');
        console.log('---------------User por IdSocket---------------');
        console.log(socketUser);

        console.log('---------------idSocket por user---------------');
        console.log(userSocket);

        console.log('---------------Contar los usuarios conectados---------------');
        console.log(Object.keys(userSocket).length);
      }

      io.emit('userList', userSocket);
    });
  });
};
