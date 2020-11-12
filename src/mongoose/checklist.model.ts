
import mongoose, { Schema } from 'mongoose';
import { ICheckiist } from './checklist.interface';
import { Todo, TodoPriority, TodoStatus } from '../generated/graphql';

export const ChecklistSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  priority: { type: TodoPriority },
  status: { type: TodoStatus },
  created: {
    type: Date,
    default: Date.now(),
  },
  todos: {
    type: Todo,
    default: []
  }
});

const ChecklistModel = mongoose.model<IChecklist>('Checklist', ChecklistSchema);

export default ChecklistModel;
