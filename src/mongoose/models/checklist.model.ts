import { model, Schema } from 'mongoose';
import { Priority } from '../../generated/graphql';
import { IChecklistDocument } from '../interfaces/checklist.interface';
import { TodoSchema } from './todo.model';

export const ChecklistSchema: Schema = new Schema({
  order: Number,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: { type: String, required: true },
  description: String,
  priority: { type: String, enum: Priority, default: Priority.Normal },
  completed: { type: Boolean, default: false },
  created: {
    type: Date,
    default: Date.now(),
  },
  expires: Date,
  todos: {
    type: [TodoSchema],
    default: [],
    required: false,
  },
});

// make it unique for user
ChecklistSchema.index({ title: 1, owner: 1 }, { unique: true });

export default model<IChecklistDocument>('Checklist', ChecklistSchema);
