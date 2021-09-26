import { RequestHandler } from 'express';
import Chat, { IChats } from '../model/Chat';

export const ChatMessange: RequestHandler = async (req, res) => {
  const { message, user } = req.body;
  try {
    const chat = new Chat({ message, user });
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

/* export const updateChatById: RequestHandler = async (req, res) => {
  const { user, message } = req.body;
  try {
    const chat: IChats = new Chat({ message, user });
    await chat.findByIdAndUpdate(req.params.id, { user, message });
    return res.status(200).json({ message: 'Chat updated' });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
 */
export const postChatById: RequestHandler = async (req, res) => {
  const { user } = req.body;
  const meId = req.userId;
  try {
    const chatExist1 = await Chat.findOne({ userId: user, meId: meId })
      .populate('userId')
      .populate('meId');
    if (chatExist1) {
      return res.status(200).json({ message: 'Chat exist', chat: chatExist1 });
    }
    const chatExist2 = await Chat.findOne({ meId: user, userId: meId })
      .populate('userId')
      .populate('meId');
    if (chatExist2) {
      return res.status(200).json({ message: 'Chat exist', chat: chatExist2 });
    }
    const chat: IChats = new Chat({ userId: user, meId: meId });
    await chat.save();
    if (chat) {
      const search = await Chat.findOne({ userId: user, meId: meId })
        .populate('userId')
        .populate('meId');
      if (search) {
        return res.status(200).json({ message: 'Chat created', search });
      }
    }

    return res.status(200).json({ message: 'Chat created not', chat });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
