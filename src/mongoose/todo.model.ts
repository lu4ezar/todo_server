import mongoose, { Schema } from 'mongoose';
import { ITodo } from './todo.interface';
import { TodoPriority, TodoStatus } from '../generated/graphql';

export const TodoSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  priority: { type: TodoPriority },
  status: { type: TodoStatus },
  created: {
    type: Date,
    default: Date.now(),
  },
});

const TodoModel = mongoose.model<ITodo>('Todo', TodoSchema);

export default TodoModel;
