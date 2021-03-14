import { Document } from 'mongoose';
import { Scalars } from '../../generated/graphql';

export interface IUser extends Document {
  id: Scalars['ID'];
  isAdmin: boolean;
  email: string;
  created: Date;
  password: string;
  validatePassword: (password: string) => boolean;
}
