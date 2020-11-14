import { model, Schema } from 'mongoose';
import { ITodo } from './todo.interface';
import { TodoPriority, TodoStatus } from '../generated/graphql';

const TodoSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  priority: { type: TodoPriority },
  status: { type: TodoStatus },
  created: {
    type: Date,
    default: Date.now(),
  },
});

export default model<ITodo>('Todo', TodoSchema);
