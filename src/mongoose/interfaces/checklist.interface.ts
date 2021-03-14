import { Document, Types } from 'mongoose';
import { Priority, Scalars } from '../../generated/graphql';
import { ITodo } from './todo.interface';

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
  todos: Types.DocumentArray<ITodo>;
}
