import { Document } from 'mongoose';
import { Priority, Scalars } from '../generated/graphql';
import { ITodo } from './todo.interface';

export interface IChecklist extends Document {
  id: Scalars['ID'];
  order: number;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  created: Date;
  expires: Date;
  todos: ITodo[];
}
