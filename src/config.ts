import dotenv from 'dotenv';

dotenv.config();

export default {
  MONGO_URI:
    process.env.MONGO_URI ||
    'mongodb+srv://Cris:159753@cluster0.ygdw3.mongodb.net/netic?retryWrites=true&w=majority',
  PORT: process.env.PORT || 4000,
};
