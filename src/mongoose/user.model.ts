import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unoque: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  checklists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Checklist',
    },
  ],
});

export default model<IUser>('User', UserSchema);
