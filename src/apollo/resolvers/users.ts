import {
  Resolvers,
  QueryResolvers,
  MutationResolvers,
  AuthPayload,
} from '../../generated/graphql';
import { IUser } from '../../mongoose/interfaces/user.interface';

const cookieOptions = {
  // 1 week
  maxAge: 60 * 60 * 24 * 7,
  httpOnly: true,
  secure: true,
  sameSite: 'None',
};

const resolvers: Resolvers = {
  Query: {
    me: (_, __, { user }) => user,
    user: (_, { email }, { dataSources }): Promise<IUser> =>
      dataSources.usersAPI.getUser(email),
    users: (_, __, { dataSources }): Promise<IUser[]> =>
      dataSources.usersAPI.getUsers(),
  } as QueryResolvers,
  Mutation: {
    createUser: async (
      _,
      { input },
      { dataSources, res }
    ): Promise<AuthPayload> => {
      const { token } = await dataSources.usersAPI.createUser(input);
      res.cookie('token', token, cookieOptions);
      return { token };
    },
    loginUser: async (
      _,
      { input },
      { dataSources, res }
    ): Promise<AuthPayload> => {
      const { token } = await dataSources.usersAPI.loginUser(input);
      res.cookie('token', token, cookieOptions);
      return { token };
    },
    updateUser: async (_, { input }, { dataSources }): Promise<IUser> =>
      dataSources.usersAPI.updateUser(input),
    deleteUser: async (_, { email }, { dataSources, res }): Promise<IUser> => {
      // not really needed //
      res.clearCookie('token');
      return dataSources.usersAPI.deleteUser(email);
    },
  } as MutationResolvers,
};

export default resolvers;
