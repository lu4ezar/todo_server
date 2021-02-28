import mongoose from 'mongoose';
import { ITodo } from '../interfaces/todo.interface';
import { Priority } from '../../generated/graphql';
import Checklist from './checklist.model';

const { model, Schema } = mongoose;

const TodoSchema = new Schema({
  order: Number,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: { type: String, required: true, unique: false },
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
    unique: false,
  },
});

// make it unique for checklist
TodoSchema.index({ title: 1, checklist: 1 }, { unique: true });

TodoSchema.pre('save', async function () {
  const todo = this as ITodo;
  if (todo.checklist) {
    const count = await Checklist.countDocuments({
      _id: todo.checklist,
    });
    if (!count) {
      throw new Error('No checklist with provided id');
    }
  }
});

export default model<ITodo>('Todo', TodoSchema);
