import { Document } from 'mongoose';
import { Todo } from '../generated/graphql';

export interface IChecklist extends Document {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  created: Date;
  todos: Todo[];
}
