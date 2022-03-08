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
  getUser = async (email: UserType['email']): Promise<IUser> =>
    (await User.findOne({ email })) as IUser;

  getUsers = async (): Promise<Array<IUser>> => User.find();

  // Mutations
  createUser = async (input: CreateUserInput): Promise<AuthPayload> => {
    const user = new User(input);
    await user.save();
    const token = jwt.sign(user.toJSON(), process.env.SECRET || '');
    return { token };
  };

  loginUser = async (input: LoginUserInput): Promise<AuthPayload> => {
    const { email, password } = input;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const passMatch = user.validatePassword(password);
    if (!passMatch) {
      throw new Error('Incorrect password');
    }
    const token = jwt.sign(user.toJSON(), process.env.SECRET || '');
    return { token };
  };

  updateUser = async (input: UpdateUserInput): Promise<IUser> =>
    (await User.findOneAndUpdate({ email: input.email }, input, {
      new: true,
    })) as IUser;

  deleteUser = async (email: UserType['email']): Promise<IUser> => {
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      throw new Error('User not found.');
    }
    return user;
  };
}
