import { model, Schema } from 'mongoose';
import { IChecklist } from './checklist.interface';
import { Priority, Status } from '../generated/graphql';

const ChecklistSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  priority: { type: Priority },
  status: { type: Status },
  created: {
    type: Date,
    default: Date.now(),
  },
  todos: { type: Array, default: [] },
});

export default model<IChecklist>('Checklist', ChecklistSchema);
