import {
  Resolvers,
	Todo,
	Checklist,
  QueryResolvers,
  MutationResolvers,
} from '../generated/graphql';
// import { ITodo } from '../mongoose/todo.interface';
// import { Checklist } from '../mongoose/checklist.interface';


const resolvers: Resolvers = {
  Query: {
    todo: (_, { id }, { dataSources }): Todo =>
      dataSources.todosAPI.getTodo(id),
    todos: (_, __, { dataSources }): Todo[] => dataSources.todosAPI.getTodos(),
    checklist: (_, { id }, { dataSources }): Checklist =>
      dataSources.checklistAPI.getChecklist(id),
    checklists: (_, __, { dataSources }): Checklist[] =>
      dataSources.checklistAPI.getChecklists(),
  } as QueryResolvers,
  Mutation: {
    createTodo: async (_, { input }, { dataSources }): Promise<Todo> =>
      dataSources.todosAPI.createTodo(input),
    updateTodo: async (_, { id, input }, { dataSources }): Promise<Todo> =>
      dataSources.todosAPI.updateTodo(id, input),
    deleteTodo: async (_, { id }, { dataSources }): Promise<Todo> =>
      dataSources.todosAPI.deleteTodo(id),
    createChecklist: async (
      _,
      { input },
      { dataSources },
    ): Promise<Checklist> => dataSources.checklistsAPI.createTodo(input),
    updateChecklist: async (
      _,
      { id, input },
      { dataSources },
    ): Promise<Checklist> => dataSources.checklistsAPI.updateTodo(id, input),
    deleteChecklist: async (_, { id }, { dataSources }): Promise<Checklist> =>
      dataSources.checklistsAPI.deleteTodo(id),
  } as MutationResolvers,
};

export default resolvers;
