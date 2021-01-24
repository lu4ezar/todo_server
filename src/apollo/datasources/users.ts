import { DataSource } from 'apollo-datasource';
import { Collection } from 'mongoose';
import jwt from 'jsonwebtoken';
import { IUser } from '../../mongoose/interfaces/user.interface';
import User from '../../mongoose/models/user.model';
import {
  CreateUserInput,
  UpdateUserInput,
  User as UserType,
  AuthPayload,
  LoginUserInput,
} from '../../generated/graphql';

export default class UsersAPI extends DataSource {
  collection: Collection;
  constructor(collection: Collection) {
    super();
    this.collection = collection;
  }

  // Queries
  async getUser(email: UserType['email']): Promise<IUser> {
    return (await User.findOne({ email })) as IUser;
  }
  async getUsers(): Promise<Array<IUser>> {
    return await User.find();
  }
  // Mutations
  async createUser(input: CreateUserInput): Promise<AuthPayload> {
    const user = new User(input);
    await user.save();
    const token = jwt.sign(user.toJSON(), process.env.SECRET || '');
    return {
      token,
    };
  }
  async loginUser(input: LoginUserInput): Promise<AuthPayload> {
    const { email, password } = input;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const passMatch = await user.validatePassword(password);
    if (!passMatch) {
      throw new Error('Incorrect password');
    }
    const token = jwt.sign(user.toJSON(), process.env.SECRET || '');
    return { token };
  }
  async updateUser(input: UpdateUserInput): Promise<IUser> {
    return (await User.findOneAndUpdate({ email: input.email }, input, {
      new: true,
    })) as IUser;
  }
  async deleteUser(email: UserType['email']): Promise<IUser> {
    const user = (await User.findOne({ email })) as IUser;
    User.deleteOne({ email });
    return user;
  }
}
