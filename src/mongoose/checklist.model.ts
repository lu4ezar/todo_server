import { model, Schema } from 'mongoose';
import { IChecklist } from './checklist.interface';
import { Priority } from '../generated/graphql';

const ChecklistSchema: Schema = new Schema({
  order: Number,
  title: { type: String, required: true, unique: true },
  description: String,
  priority: { type: Priority },
  completed: Boolean,
  created: {
    type: Date,
    default: Date.now(),
  },
  expires: Date,
  todos: { type: Array, default: [] },
});

export default model<IChecklist>('Checklist', ChecklistSchema);
