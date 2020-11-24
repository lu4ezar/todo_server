import mongoose from 'mongoose';
const Document = mongoose.Document;
import { IChecklist } from './checklist.interface';

export interface IUser extends Document {
  email: string;
  created: Date;
  checklists: IChecklist['_id'][];
}
