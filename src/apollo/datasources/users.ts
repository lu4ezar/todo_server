
import { DataSource } from 'apollo-datasource';
import { Collection, MongooseUpdateQuery } from 'mongoose';
import { IUser } from '../../mongoose/user.interface';
import User from '../../mongoose/user.model';
// import { CreateChecklistInput, Scalars } from '../../generated/graphql';

export default class UsersAPI extends DataSource {
  collection: Collection;
  constructor(collection: Collection) {
    super();
    this.collection = collection;
  }

  // Queries
  async getUser(email: string): Promise<IUser> {
    return (await User.findOne({ email })) as IUser;
  }
  // Mutations
  async createUser(input: CreateUserInput): Promise<IUser> {
    const user = new User(input);
    return await user.save();
  }
  async updatePassword({
    email, password: newHashedPassword
  }): Promise<IUser> {
    return (await User.findOneAndUpdate({ email }, {
    hashedPassword: newHashedPassword
    }, {
      new: true,
    })) as IUser;
  }
  async deleteUser(email): Promise<IUser> {
    const user = (await User.findOne({ email })) as IUser;
    await User.deleteOne({ email });
    return user;
  }
}
