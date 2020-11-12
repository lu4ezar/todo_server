/* eslint-disable no-console */
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { Common, Todo, Checklist } from './apollo/typeDefs/';
import resolvers from './apollo/resolvers';
import db from './mongoose/db';
import TodoModel from './mongoose/todo.model';
import TodosAPI from './apollo/datasource';

const server = new ApolloServer({
  typeDefs: [Common, Todo, Checklist],
  resolvers,
  dataSources: () => ({
    todosAPI: new TodosAPI(TodoModel.collection),
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
