/* eslint-disable no-console */
import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import db from './mongoose/db';
import dataSources from './apollo/datasources';
import { schema } from './apollo/schema';
import { applyMiddleware } from 'graphql-middleware';
import { permissions } from './apollo/permissions';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  dataSources,
  context: async ({ req, res }: { req: Request; res: Response }) => {
    try {
      let user;
      if (req.cookies.token) {
        const token = req.cookies.token || '';
        user = jwt.verify(token, process.env.SECRET as string);
        return { db, res, user };
      }
      return { db, res, user: null };
    } catch (err) {
      console.error(err.message);
    }
  },
  playground: true,
  introspection: true,
});

server.applyMiddleware({
  app,
  cors: {
    origin: process.env.ORIGIN || '',
    credentials: true,
  },
});

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`server is listening. http://localhost:4000${server.graphqlPath}`)
);
