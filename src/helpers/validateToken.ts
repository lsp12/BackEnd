import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

interface IPayload {
  _id: string;
  email: string;
}

export const validateToken: RequestHandler = (req, res, next) => {
  const SECRET = 'secretUser';
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json('Acces denied');

  const payload = jwt.verify(token, SECRET) as IPayload;

  req.userId = payload._id;

  next();
};

/* export const validateToken: RequestHandler = (req, res, next) => {
  const { Authorization } = req.body;
  const token = Authorization.split(' ')[1];
  console.log(token);
  if (!token) return res.status(401).json('Acces denied');

  const payload = jwt.verify(token, 'secretUser') as IPayload;

  console.log(payload);

  return res.status(200).send({ payload });
}; */
