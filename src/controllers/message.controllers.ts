import { RequestHandler } from 'express';
import Mensaje from '../model/Mensaje';
import * as fs from 'fs';

export const saveMessage: RequestHandler = async (req, res) => {
  const { chatId, sender, text } = req.body;
  try {
    const message = new Mensaje({ chatId, sender, text });
    const savedMessage = await message.save();
    return res.status(200).json(savedMessage);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getMessages: RequestHandler = async (req, res) => {
  const { chatId } = req.body;
  try {
    const messages = await Mensaje.find({ chatId });
    if (messages) {
      return res.status(200).json({ messages });
    } else {
      return res.status(404).json({ message: 'No messages found' });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getNafa: RequestHandler = async (req, res) => {
  console.log(__dirname);
  var data = await fs.promises.readFile(`public/pdf.pdf`);
  res.send(data);
};
