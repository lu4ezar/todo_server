import { Document } from 'mongoose';
import { Scalars } from '../../generated/graphql';
import { IChecklistDocument } from './checklist.interface';

export interface IUser extends Document {
  id: Scalars['ID'];
  isAdmin: boolean;
  email: string;
  created: Date;
  checklists: IChecklistDocument['_id'][];
  password: string;
  validatePassword: (password: string) => boolean;
}
