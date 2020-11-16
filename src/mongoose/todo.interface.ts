import { Document } from 'mongoose';
import { IChecklist } from './checklist.interface';

export interface ITodo extends Document {
  id: string;
  order: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  created: Date;
  expires: Date;
  checklist: IChecklist['_id'];
}
