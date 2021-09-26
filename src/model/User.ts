import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const User: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: false },
    lastName: { type: String, required: false },
  },
  { timestamps: true, versionKey: false },
);

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  lastName: string;
  encryptPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}

User.methods.encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
User.methods.validatePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

export default model<IUser>('User', User);
