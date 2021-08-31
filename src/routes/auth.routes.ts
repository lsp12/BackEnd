import { Router } from 'express';
import { register } from '../controllers/auth.controllers';

const route = Router();

route.route('/userAuth').post(register);

export default route;
