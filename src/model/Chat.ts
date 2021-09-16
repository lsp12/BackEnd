import { Schema, Document, Model, model } from 'mongoose';

export interface IChats extends Document {
  _id: string;
  userId: string;
  contactId: string;
  chatId: string;
}

const Chats: Schema<IChats> = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    contactId: { type: String, required: true, unique: true },
    chatId: { type: String, required: true },
    time: { type: Date, default: Date.now, required: false },
  },
  { timestamps: true, versionKey: false },
);

export default model<IChats>('Chats', Chats);
