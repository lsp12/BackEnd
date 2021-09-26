import { Router } from 'express';
import { GetChat, postChatById } from '../controllers/chat.controllers';
import { validateToken } from '../helpers/validateToken';

const route = Router();

route.route('/chat').post(validateToken, postChatById).get(GetChat);

export default route;
