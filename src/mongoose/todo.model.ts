import { model, Schema } from 'mongoose';
import { ITodo } from './todo.interface';
import { Priority, Status } from '../generated/graphql';

const TodoSchema: Schema = new Schema({
  order: Number,
  title: { type: String, required: true, unique: true },
  description: String,
  priority: { type: Priority },
  status: { type: Status },
  created: {
    type: Date,
    default: Date.now(),
  },
  checklist: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export default model<ITodo>('Todo', TodoSchema);
