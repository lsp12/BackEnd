import mongoose, { ConnectionOptions } from 'mongoose';
import config from './config';

(async () => {
  try {
    const mongooseOptions: ConnectionOptions = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    };
    const db = await mongoose.connect(config.MONGO_URI, mongooseOptions);
    console.log('Database is connected to', db.connection.name);
  } catch (err) {
    console.error(err);
  }
})();
