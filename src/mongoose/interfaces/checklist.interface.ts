import { Document } from 'mongoose';
import { Priority, Scalars, Todo } from '../../generated/graphql';

export interface IChecklistDocument extends Document {
  id: Scalars['ID'];
  owner: Scalars['ID'];
  order: number;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  created: Date;
  expires: Date;
  todos: Array<Todo>;
}
