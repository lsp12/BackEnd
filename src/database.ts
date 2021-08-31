import mongoose, { ConnectionOptions } from 'mongoose';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/subcentro';
(async () => {
  try {
    const mongooseOptions: ConnectionOptions = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    };
    const db = await mongoose.connect(MONGO_URI, mongooseOptions);
    console.log('Database is connected to', db.connection.name);
  } catch (err) {
    console.error(err);
  }
})();
