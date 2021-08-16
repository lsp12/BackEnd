import mongoose, { ConnectOptions } from 'mongoose';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/subcentro';
export const dataBase = async () => {
  try {
    const mongoOption: ConnectOptions = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    };
    const db = await mongoose.connect(MONGO_URI, mongoOption);
    console.log('Connected to database', db.connection.name);
  } catch (error) {
    console.log('Error connecting to database', error);
  }
};
