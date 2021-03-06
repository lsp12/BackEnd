import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../model/User';

function createToken(users: IUser) {
  return jwt.sign({ _id: users._id, email: users.email }, 'secretUser', {
    expiresIn: 86400,
  });
}

export const register: RequestHandler = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).send('Missing email or password');
    }

    let emailexist = await User.findOne({ email });
    if (emailexist) {
      return res.status(400).send('Email already exists');
    }

    let userName = await User.findOne({ username });
    if (userName) {
      return res.status(400).send('userName already exists');
    }

    const user: IUser = new User({ email, password, username });

    user.password = await user.encryptPassword(user.password);

    await user.save();
    return res.status(200).send({ message: 'user Created' });
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
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send('Missing email or password');
    }
    const data = await User.findOne({ username });
    if (!data) {
      return res.status(400).send('User not found');
    }
    const validate = await data.validatePassword(password);
    if (validate) {
      return res.status(200).send({ token: createToken(data) });
    } else {
      return res.status(400).send('invalidate password');
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};
