import { Document } from 'mongoose';
import { Priority, Scalars } from '../../generated/graphql';
import { IChecklistDocument } from './checklist.interface';

export interface ITodo extends Document {
  id: Scalars['ID'];
  owner: Scalars['ID'];
  order: number;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  created: Date;
  expires: Date;
  checklist: IChecklistDocument['_id'];
}
