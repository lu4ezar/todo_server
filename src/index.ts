/* eslint-disable no-console */
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import db from './mongoose/db';
import { TodoModel, ChecklistModel, UserModel } from './mongoose';
import { TodosAPI, ChecklistsAPI, UsersAPI } from './apollo/datasources';
import { schema } from './apollo/schema';

// const authMiddleware = (request, response, next) => {
//   // const token = request.get('authorization');
//   // const user = getUser(token);
//   const user = {};
//   if (user) {
//     request.user = user;
//     next();
//   }
//   response.status(401).end();
// };

const server = new ApolloServer({
  schema,
  dataSources: () => ({
    todosAPI: new TodosAPI(TodoModel.collection),
    checklistsAPI: new ChecklistsAPI(ChecklistModel.collection),
    usersAPI: new UsersAPI(UserModel.collection),
  }),
  context: async (req) => ({ req, db }),
  playground: true,
  introspection: true,
});

const app = express();
// app.use(authMiddleware);

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`server is listening. http://localhost:4000${server.graphqlPath}`)
);
