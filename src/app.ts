import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { route } from './routes/index.routes';
import { dataBase } from './dataBase/database';
dataBase();
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/network', route.userAuth);
export default app;
