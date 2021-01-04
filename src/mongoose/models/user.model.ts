import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { validate } from 'isemail';
import { IUser } from '../interfaces/user.interface';

const { model, Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validate, 'invalid email'],
    createIndexes: { unique: true },
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  password: String,
  checklists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Checklist',
    },
  ],
});

UserSchema.pre<IUser>('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.validatePassword = async function validatePassword(
  candidate: string
) {
  return bcrypt.compare(candidate, this.password);
};

export interface IUserModel extends Model<IUser> {
  validatePassword(data: string): Promise<boolean>;
}

export default model<IUser, IUserModel>('User', UserSchema);
