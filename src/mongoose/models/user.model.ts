import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { validate } from 'isemail';
import { IUser } from '../interfaces/user.interface';
import Checklist from './checklist.model';

const { model, Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validate, 'invalid email'],
    createIndexes: { unique: true }
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: true
  },
  created: {
    type: Date,
    default: Date.now()
  },
  password: String
});

UserSchema.pre<IUser>('save', async function () {
  if (!this.isModified('password')) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    return err;
  }
});

UserSchema.post<IUser>(/delete/i, async function (user) {
  try {
    return await Checklist.deleteMany({ owner: user._id });
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
});

UserSchema.methods.validatePassword = async function (this, candidate) {
  return bcrypt.compare(candidate, (this as IUser).password);
};

export default model<IUser>('User', UserSchema);
