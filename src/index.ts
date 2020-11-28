/* eslint-disable no-console */
import express, { Request } from 'express';
import { ApolloServer } from 'apollo-server-express';
import db from './mongoose/db';
import { TodoModel, ChecklistModel, UserModel } from './mongoose';
import { TodosAPI, ChecklistsAPI, UsersAPI } from './apollo/datasources';
import { schema } from './apollo/schema';
import isemail from 'isemail';

const dataSources = {
  todosAPI: new TodosAPI(TodoModel.collection),
  checklistsAPI: new ChecklistsAPI(ChecklistModel.collection),
  usersAPI: new UsersAPI(UserModel.collection),
};

const context = async ({ req }: { req: Request }) => {
  const auth = (req.headers && req.headers.authorization) || '';
  console.log(auth);
  const email = Buffer.from(auth, 'base64').toString('ascii');
  console.log(email);
  if (!isemail.validate(email)) return { user: null };
  const user = await dataSources.usersAPI.createUser({
    email,
    hashedPassword: 'password',
  });
  console.log(user);
  return { user, db };
};

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
  // dataSources: () => ({
  //   todosAPI: new TodosAPI(TodoModel.collection),
  //   checklistsAPI: new ChecklistsAPI(ChecklistModel.collection),
  //   usersAPI: new UsersAPI(UserModel.collection),
  // }),
  dataSources: () => dataSources,
  // context: async () => db,
  context,
  playground: true,
  introspection: true,
});

const app = express();
// app.use(authMiddleware);

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`server is listening. http://localhost:4000${server.graphqlPath}`)
);
