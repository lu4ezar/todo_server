/* eslint-disable no-console */
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { Todos, Checklists } from './apollo/resolvers';
import db from './mongoose/db';
import TodoModel from './mongoose/todo.model';
import ChecklistModel from './mongoose/checklist.model';
import { TodosAPI, ChecklistsAPI } from './apollo/datasource';
import { Checklist, Common, Todo } from './apollo/typeDefs';

const server = new ApolloServer({
  typeDefs: [Common, Todo, Checklist],
  resolvers: [Todos, Checklists],
  dataSources: () => ({
    todosAPI: new TodosAPI(TodoModel.collection),
    checklistsAPI: new ChecklistsAPI(ChecklistModel.collection),
  }),
  context: async () => db,
  playground: true,
  introspection: true,
});

const app = express();

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(
    `server is listening. http://localhost:4000${server.graphqlPath}`,
  ),
);
