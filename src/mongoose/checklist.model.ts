import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { IChecklist } from './checklist.interface';
import { Priority } from '../generated/graphql';

const ChecklistSchema: Schema = new Schema({
  order: Number,
  title: { type: String, required: true, unique: true },
  description: String,
  priority: { type: Priority, default: Priority.Normal },
  completed: { type: Boolean, default: false },
  created: {
    type: Date,
    default: Date.now(),
  },
  expires: Date,
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
});

export default model<IChecklist>('Checklist', ChecklistSchema);
