import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { validate } from 'isemail';
import { IUser } from './user.interface';
// import { User } from '../generated/graphql';

const { model, Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
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
    this.hashedPassword = await bcrypt.hash(this.hashedPassword, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

/* bcrypt.compare(req.body.password, user.password, function(err, res) {
  if (err){
    // handle error
  }
  if (res)
    // Send JWT
  } else {
    // response is OutgoingMessage object that server response http request
    return response.json({success: false, message: 'passwords do not match'});
  }
});

*/

UserSchema.methods.validatePassword = async function validatePassword(
  data: string
) {
  return bcrypt.compare(data, this.password);
};

export default model<IUser>('User', UserSchema);
