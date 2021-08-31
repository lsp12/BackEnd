import app from './app';
import { dataBase } from './database/database';
dataBase();
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
