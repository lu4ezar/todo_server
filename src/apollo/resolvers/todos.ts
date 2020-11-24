import {
  Resolvers,
  Todo,
  QueryResolvers,
  MutationResolvers,
} from '../../generated/graphql';
import { ITodo } from '../../mongoose/todo.interface';

const resolvers: Resolvers = {
  Query: {
    todo: (_, { id }, { dataSources }): ITodo =>
      dataSources.todosAPI.getTodo(id),
    todos: (
      _,
      { checklist }: { checklist: Todo['checklist'] },
      { dataSources }
    ): ITodo[] => {
      const todos = dataSources.todosAPI.getTodos();
      if (!checklist) {
        return todos;
      }
      const chck = dataSources.checklistAPI.getChecklist(checklist);
      return chck.todos;
    },
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
