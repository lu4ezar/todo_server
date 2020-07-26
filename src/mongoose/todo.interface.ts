import { Document } from 'mongoose';

export interface ITodo extends Document {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  created: Date;
}
