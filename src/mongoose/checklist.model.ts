import { model, Schema } from 'mongoose';
import { IChecklist } from './checklist.interface';
// import { ITodo } from './todo.interface';.

import { Todo, Priority, Status } from '../generated/graphql';

const ChecklistSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  priority: { type: Priority },
  status: { type: Status },
  created: {
    type: Date,
    default: Date.now(),
  },
  todos: { type: [Todo] },
});

export default model<IChecklist>('Checklist', ChecklistSchema);
