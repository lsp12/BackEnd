import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../model/User';

function createToken(users: IUser) {
  return jwt.sign({ _id: users._id, email: users.email }, 'secretUser', {
    expiresIn: 86400,
  });
}

export const register: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).send('Missing email or password');
    }

    let emailexist = await User.findOne({ email });
    if (emailexist) {
      return res.status(400).send('Email already exists');
    }

    const user: IUser = new User({ email, password });

    user.password = await user.encryptPassword(user.password);

    await user.save();
    return res.status(200).send({ token: createToken(user) });
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    return res.status(200).send('User deleted');
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const getUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};
