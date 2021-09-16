import { RequestHandler } from 'express';
import Chat, { IChats } from '../model/Chat';

export const ChatMessange: RequestHandler = async (req, res) => {
  const { message, user } = req.body;
  try {
    const chat: IChats = new Chat({ message, user });
    await chat.save();
    return res.status(200).json({ message: 'Message sent' });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const GetChat: RequestHandler = async (req, res) => {
  try {
    const chat = await Chat.find();
    return res.status(200).json({ chat });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const deleteChatById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await Chat.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Chat deleted' });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const updateChatById: RequestHandler = async (req, res) => {
  const { user, message } = req.body;
  try {
    const chat: IChats = new Chat({ message, user });
    await chat.findByIdAndUpdate(req.params.id, { user, message });
    return res.status(200).json({ message: 'Chat updated' });
  } catch (error) {}
};
