import { Document } from 'mongoose';
import { IChecklist } from './checklist.interface';

export interface IUser extends Document {
  email: string;
  created: Date;
  checklists: IChecklist['_id'][];
  hashedPassword: string;
  validatePassword: (String) => boolean;
}
