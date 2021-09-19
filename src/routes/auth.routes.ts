import { Router } from 'express';
import { register } from '../controllers/auth.controllers';
import { validateToken } from '../helpers/validateToken';

const route = Router();

route.route('/userAuth').post(register);
route.route('/userAuthToken').post(validateToken, (req, res) => {
  res.status(200).json({
    message: 'Token valido',
  });
});

export default route;
