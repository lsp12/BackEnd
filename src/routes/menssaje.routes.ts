import { Router } from 'express';
import { getMessages, getNafa, saveMessage } from '../controllers/message.controllers';

const route = Router();

route.route('/newmensaje').post(saveMessage);
route.route('/mensaje').post(getMessages).get(getNafa);

export default route;
