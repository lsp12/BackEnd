import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { route } from './routes/index.routes';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.set('port', PORT);

app.use('/api', route.userAuth);
export default app;
