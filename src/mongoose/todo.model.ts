import { model, Schema } from 'mongoose';
import { ITodo } from './todo.interface';
import { Priority, Status } from '../generated/graphql';

const TodoSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  priority: { type: Priority },
  status: { type: Status },
  created: {
    type: Date,
    default: Date.now(),
  },
});

export default model<ITodo>('Todo', TodoSchema);
