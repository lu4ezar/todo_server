import { Document } from 'mongoose';
import { Priority, Scalars } from '../generated/graphql';
import { IChecklist } from './checklist.interface';

export interface ITodo extends Document {
  id: Scalars['ID'];
  order: number;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  created: Date;
  expires: Date;
  checklist: IChecklist['_id'];
}
