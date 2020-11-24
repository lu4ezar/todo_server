import mongoose from 'mongoose';
import { ITodo } from './todo.interface';
import { Priority } from '../generated/graphql';

const { model, Schema } = mongoose;

const TodoSchema = new Schema({
  order: Number,
  title: { type: String, required: true, unique: true },
  description: String,
  priority: { type: Priority, default: Priority.Normal },
  completed: { type: Boolean, default: false },
  expires: Date,
  created: {
    type: Date,
    default: Date.now(),
  },
  checklist: {
    type: Schema.Types.ObjectId,
    ref: 'Checklist',
  },
});

export default model<ITodo>('Todo', TodoSchema);
