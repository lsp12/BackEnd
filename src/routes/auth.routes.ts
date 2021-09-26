import { Router } from 'express';
import { getUser, register } from '../controllers/auth.controllers';
import { validateToken } from '../helpers/validateToken';

const route = Router();

route.route('/userAuth').post(register);
route.route('/loginAuth').post(getUser);

export default route;
