import { model, Schema } from 'mongoose';
import { IChecklistRefDocument } from '../interfaces/checklist.interface';
import { Priority } from '../../generated/graphql';
import Todo from './todo.model';

const ChecklistSchema: Schema = new Schema({
  order: Number,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: { type: String, required: true, unique: true },
  description: String,
  priority: { type: Priority, default: Priority.Normal },
  completed: { type: Boolean, default: false },
  created: {
    type: Date,
    default: Date.now(),
  },
  expires: Date,
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
});

// make it unique for user
ChecklistSchema.index({ title: 1, owner: 1 }, { unique: true });

ChecklistSchema.post('findOneAndDelete', async function (checklist) {
  await Todo.deleteMany({ checklist: checklist._id });
});

export default model<IChecklistDocument>('Checklist', ChecklistSchema);
