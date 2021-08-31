import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { route } from './routes/index.routes';
import config from './config';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.set('port', config.PORT);

app.use('/api', route.userAuth);
export default app;
