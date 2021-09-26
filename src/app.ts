import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { route } from './routes/index.routes';
import config from './config';

const app = express();

app.set('port', config.PORT);

app.use(morgan('dev'));

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/api', route.allUser, route.userAuth, route.chat, route.message);

export default app;
