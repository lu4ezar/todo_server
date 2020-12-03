import { Document } from 'mongoose';
import { IChecklist } from './checklist.interface';

export interface IUser extends Document {
  email: string;
  created: Date;
  checklists: IChecklist['_id'][];
  password: string;
  validatePassword: (String) => boolean;
}
