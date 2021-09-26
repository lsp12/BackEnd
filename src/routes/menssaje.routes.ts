import { Router } from 'express';
import { getMessages, saveMessage } from '../controllers/message.controllers';

const route = Router();

route.route('/newmensaje').post(saveMessage);
route.route('/mensaje').post(getMessages);

export default route;
