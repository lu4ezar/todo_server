/* eslint-disable no-console */
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import db from './mongoose/db';
import TodoModel from './mongoose/todo.model';
import ChecklistModel from './mongoose/checklist.model';
import { TodosAPI, ChecklistsAPI } from './apollo/datasources';
import { schema } from './apollo/schema';
import { applyMiddleware } from 'graphql-middleware';
import { permissions } from './apollo/permissions';

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: ({ req }: { req: RequestWithUser }) => {
    return { db, user: req.user || '' };
  },
  playground: true,
  introspection: true,
});

const app = express();
// app.use(authMiddleware);

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`server is listening. http://localhost:4000${server.graphqlPath}`)
);
