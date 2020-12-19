import { Document } from 'mongoose';
import { IChecklistRefDocument } from './checklist.interface';

export interface IUser extends Document {
  email: string;
  created: Date;
  checklists: IChecklistRefDocument['_id'][];
  password: string;
  validatePassword: (password: string) => boolean;
}
