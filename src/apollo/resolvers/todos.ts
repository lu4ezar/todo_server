import {
  Resolvers,
  Todo,
  QueryResolvers,
  MutationResolvers,
} from '../../generated/graphql';

const resolvers: Resolvers = {
  Query: {
    todo: (_, { id }, { dataSources }): Todo =>
      dataSources.todosAPI.getTodo(id),
    todos: (_, __, { dataSources }): Todo[] => dataSources.todosAPI.getTodos(),
  } as QueryResolvers,
  Mutation: {
    createTodo: async (_, { input }, { dataSources }): Promise<Todo> =>
      dataSources.todosAPI.createTodo(input),
    updateTodo: async (_, { input }, { dataSources }): Promise<Todo> =>
      dataSources.todosAPI.updateTodo(input),
    deleteTodo: async (_, { id }, { dataSources }): Promise<Todo> =>
      dataSources.todosAPI.deleteTodo(id),
  } as MutationResolvers,
};

export default resolvers;
