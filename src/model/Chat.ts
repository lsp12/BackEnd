import { Schema, Document, Model, model } from 'mongoose';

export interface IChats extends Document {
  data: any;
  meId: string;
  userId: string;
}

const Chats: Schema<IChats> = new Schema(
  {
    meId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export default model<IChats>('Chats', Chats);
