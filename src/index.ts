import app from './app';
import { dataBase } from './database/database';
dataBase();
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});
