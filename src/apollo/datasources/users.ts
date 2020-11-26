import { DataSource } from 'apollo-datasource';
import { Collection } from 'mongoose';
import { IUser } from '../../mongoose/user.interface';
import User from '../../mongoose/user.model';
import {
  CreateUserInput,
  Scalars,
  UpdateUserInput,
} from '../../generated/graphql';

export default class UsersAPI extends DataSource {
  collection: Collection;
  constructor(collection: Collection) {
    super();
    this.collection = collection;
  }

  // Queries
  async getUser(email: Scalars['String']): Promise<IUser> {
    return (await User.findOne({ email })) as IUser;
  }
  // Mutations
  async createUser(input: CreateUserInput): Promise<IUser> {
    const user = new User(input);
    return await user.save();
  }
  async updateUser(input: UpdateUserInput): Promise<IUser> {
    return (await User.findOneAndUpdate({ email: input.email }, input, {
      new: true,
    })) as IUser;
  }
  async deleteUser(email: Scalars['String']): Promise<IUser> {
    const user = (await User.findOne({ email })) as IUser;
    User.deleteOne({ email });
    return user;
  }
}
