import { model, Schema } from 'mongoose';

export interface IMensaje extends Document {
  idChat: string;
}

const Mensaje: Schema<IMensaje> = new Schema(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: 'Chats',
      require: true,
    },
    sender: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export default model<IMensaje>('Mensaje', Mensaje);
