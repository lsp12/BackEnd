import dotenv from 'dotenv';

dotenv.config();

export default {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/subcentro',
  PORT: process.env.PORT || 4000,
};
