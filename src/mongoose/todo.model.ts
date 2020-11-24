import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { ITodo } from './todo.interface';
import { Priority } from '../generated/graphql';

const TodoSchema: Schema = new Schema({
  order: Number,
  title: { type: String, required: true, unique: true },
  description: String,
  priority: { type: Priority },
  completed: Boolean,
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
