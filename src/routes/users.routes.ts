import { Router } from 'express';
import { getAllUsers, me } from '../controllers/user.controllers';
import { validateToken } from '../helpers/validateToken';

const route = Router();

route.route('/allUser').get(validateToken, getAllUsers);
route.route('/me').get(validateToken, me);

export default route;
