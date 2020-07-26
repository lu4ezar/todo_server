import {
  Resolvers,
  Todo,
  QueryResolvers,
  MutationResolvers,
} from '../generated/graphql';
import { ITodo } from '../mongoose/todo.interface';

const resolvers: Resolvers = {
  Query: {
    todo: (_, { id }, { dataSources }): Todo =>
      dataSources.todosAPI.getTodo(id),
    todos: (_, __, { dataSources }): Todo[] => dataSources.todosAPI.getTodos(),
  } as QueryResolvers,
  Mutation: {
    createTodo: async (_, { input }, { dataSources }): Promise<Todo> =>
      dataSources.todosAPI.createTodo(input),
    updateTodo: async (_, { id, input }, { dataSources }): Promise<Todo> =>
      dataSources.todosAPI.updateTodo(id, input),
    deleteTodo: async (_, { id }, { dataSources }): Promise<ITodo> =>
      dataSources.todosAPI.deleteTodo(id),
  } as MutationResolvers,
};

export default resolvers;
