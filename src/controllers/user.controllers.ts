import { RequestHandler } from 'express';
import User from '../model/User';

export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const me: RequestHandler = async (req, res) => {
  const useLoged = await User.findById(req.userId);
  return res.status(200).send(useLoged);
};
