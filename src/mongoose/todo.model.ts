import { model, Schema } from 'mongoose';
import { ITodo } from './todo.interface';
import { Priority } from '../generated/graphql';
import Checklist from './checklist.model';

const TodoSchema: Schema = new Schema<ITodo>({
  order: Number,
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

export default model('Todo', TodoSchema);
