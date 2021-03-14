import mongoose from 'mongoose';
import { ITodo } from '../interfaces/todo.interface';
import { Priority } from '../../generated/graphql';

const { model, Schema } = mongoose;

export const TodoSchema = new Schema({
  order: Number,
  title: {
    type: String,
    required: true,
    default: '',
  },
  description: String,
  priority: { type: Priority, default: Priority.Normal },
  completed: { type: Boolean, default: false },
  expires: Date,
  created: {
    type: Date,
    default: Date.now(),
  },
});

export default model<ITodo>('Todo', TodoSchema);
