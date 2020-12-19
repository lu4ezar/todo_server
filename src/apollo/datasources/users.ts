import { DataSource } from 'apollo-datasource';
import { Collection } from 'mongoose';
import jwt from 'jsonwebtoken';
import { IUser } from '../../mongoose/user.interface';
import User from '../../mongoose/user.model';
import {
  CreateUserInput,
  Scalars,
  UpdateUserInput,
  // User as UserType,
  AuthPayload,
} from '../../generated/graphql';

export default class UsersAPI extends DataSource {
  collection: Collection;
  constructor(collection: Collection) {
    super();
    this.collection = collection;
  }

  // Queries
  // async getUser(email: Scalars['String']): Promise<IUser> {
  //   return (await User.findOne({ email })) as IUser;
  // }
  // Mutations
  async createUser(input: CreateUserInput): Promise<AuthPayload> {
    const user = new User(input);
    await user.save();
    return {
      token: jwt.sign(user, 'secret'),
    };
  }
  async authUser(input: {
    email: string;
    password: string;
  }): Promise<AuthPayload> {
    const { email, password } = input;
    const user = await User.findOne({ email });
    if (user?.validatePassword(password)) {
      const token = jwt.sign(user, 'secret');
      return { token };
    }
    throw new Error('User not found');
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
