import { Resolvers, MutationResolvers } from '../../generated/graphql';
import { IChecklistDocument } from '../../mongoose/interfaces/checklist.interface';

const resolvers: Resolvers = {
  Mutation: {
    createTodo: async (
      _,
      { input },
      { dataSources }
    ): Promise<IChecklistDocument> => dataSources.todosAPI.createTodo(input),
    updateTodo: async (
      _,
      { input },
      { dataSources }
    ): Promise<IChecklistDocument> => dataSources.todosAPI.updateTodo(input),
    deleteTodo: async (
      _,
      { id },
      { dataSources }
    ): Promise<IChecklistDocument> => dataSources.todosAPI.deleteTodo(id),
    toggleTodo: async (
      _,
      { id },
      { dataSources }
    ): Promise<IChecklistDocument> => dataSources.todosAPI.toggleTodo(id),
  } as MutationResolvers,
};

export default resolvers;
