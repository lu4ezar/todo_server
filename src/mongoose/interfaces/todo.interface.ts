import { Document } from 'mongoose';
import { Priority, Scalars } from '../../generated/graphql';

export interface ITodo extends Document {
  id: Scalars['ID'];
  order: number;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  created: Date;
  expires: Date;
}
