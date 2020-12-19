import {
  Resolvers,
  // QueryResolvers,
  MutationResolvers,
  AuthPayload,
} from '../../generated/graphql';
import { IUser } from '../../mongoose/user.interface';

const resolvers: Resolvers = {
  // Query: {
  //   user: (_, { email }, { dataSources, req }): Promise<IUser> =>
  //     dataSources.usersAPI.getUser(email),
  // } as QueryResolvers,
  Mutation: {
    createUser: async (_, { input }, { dataSources }): Promise<AuthPayload> =>
      dataSources.usersAPI.createUser(input),
    loginUser: async (_, { input }, { dataSources }): Promise<AuthPayload> =>
      dataSources.usersAPI.loginUser(input),
    updateUser: async (_, { input }, { dataSources }): Promise<IUser> =>
      dataSources.usersAPI.updateUser(input),
    deleteUser: async (_, { email }, { dataSources }): Promise<IUser> =>
      dataSources.usersAPI.deleteUser(email),
  } as MutationResolvers,
};

export default resolvers;
