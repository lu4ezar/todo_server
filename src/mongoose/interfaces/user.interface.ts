import { Document } from 'mongoose';
import { Scalars } from '../../generated/graphql';
import { IChecklistRefDocument } from './checklist.interface';

export interface IUser extends Document {
  id: Scalars['ID'];
  email: string;
  created: Date;
  checklists: IChecklistRefDocument['_id'][];
  password: string;
  validatePassword: (password: string) => boolean;
}
