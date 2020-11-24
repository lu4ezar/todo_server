/* eslint-disable no-console */
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import db from './mongoose/db';
// import TodoModel from './mongoose/todo.model';
// import ChecklistModel from './mongoose/checklist.model';
// import { TodosAPI, ChecklistsAPI } from './apollo/datasource';
import { schema } from './apollo/schema';
import datasources from './apollo/datasources';

const authMiddleware = (request, response, next) => {
  const token = request.get('authorization');
  const user = loadUser(token);
  if (user) {
    request.user = user;
    next();
  }
  response.status(401).end();
};

const server = new ApolloServer({
  schema,
  datasources,
  context: async () => db,
  playground: true,
  introspection: true,
});

const app = express(authMiddleware);

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`server is listening. http://localhost:4000${server.graphqlPath}`)
);
