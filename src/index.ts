import app from './app';
import './database';
import initSocket from './socket/initSocket';

const server = initSocket(app);

server.server.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
