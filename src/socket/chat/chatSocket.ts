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
  let id: any[] = [];
  io.on('connection', socket => {
    //socket connected
    console.log('new connection:', socket.id);
    //user connected
    socket.on('addUser', userId => {
      if (userId) {
        saveConexion(userId, socket);
      }

      io.emit('userList', { socketUser });
    });

    socket.on('listUserCli', listUser => {
      console.log(listUser);
      const userConect = getConexion(listUser.idUser);
      if (userConect) {
        console.log(userConect.length);
        if (userConect.length > 0) {
          console.log(true);
          io.emit('listUser', { listUser: true, idUser: listUser.idUser });
        } else {
          console.log(false);
          io.emit('listUser', { listUser: false, idUser: listUser.idUser });
        }
      }
    });

    //send and get message
    socket.on('sendMessage', ({ message, senderId, reciveId }) => {
      console.log(message, senderId, reciveId);
      const user = getConexion(reciveId);
      const sender = getConexion(senderId);
      if (user) {
        user.map((id: string) => {
          io.to(id).emit('reciveMessage', { message, senderId });
        });
        console.log('-------------mensaje enviado------------');
        console.log(message, senderId, reciveId);
      }
      console.log(sender);
      if (sender) {
        sender.map((id: string) => {
          if (id != socket.id) {
            io.to(id).emit('reciveMessage', { message, senderId });
            console.log('-------------mensaje de replica------------');
            console.log(message, senderId, reciveId);
          }
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

        console.log('--------------desconccion de usuario------------');
        console.log('---------------User por IdSocket---------------');
        console.log(socketUser);

        console.log('---------------idSocket por user---------------');
        console.log(userSocket);

        console.log('---------------Contar los usuarios conectados---------------');
        console.log(Object.keys(userSocket).length);
      }

      const userConect = getConexion(socketUser[socket.id]);
      if (!userConect) {
        console.log(
          '---------------este usuario se a desconectado------------',
          socketUser[socket.id],
        );
        console.log(false);
        io.emit('listUser', { listUser: false, idUser: socketUser[socket.id] });
      }

      delete socketUser[socket.id];
    });
  });
};
