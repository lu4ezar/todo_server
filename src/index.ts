/* eslint-disable no-console */
import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { applyMiddleware } from 'graphql-middleware';
import cookieParser from 'cookie-parser';
import db from './mongoose/db';
import dataSources from './apollo/datasources';
import schema from './apollo/schema';
import { permissions } from './apollo/permissions';
import logger from './logger';

const app = express();
app.use(cookieParser());

let server: ApolloServer | null;

const startServer = async (): Promise<ApolloServer> => {
  server = new ApolloServer({
    schema: applyMiddleware(schema, permissions),
    dataSources,
    context: async ({ req, res }: { req: Request; res: Response }) => {
      try {
        let user;
        if (req && req.cookies.token) {
          const token = req.cookies.token || '';
          user = jwt.verify(token, process.env.SECRET as string);
          return { db, res, user };
        }
      } catch (err: unknown) {
        if (err instanceof Error) logger.error(err.message);
      }
      return { db, res, user: null };
    },
    introspection: true,
  });
  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      origin: process.env.ORIGIN || '',
      credentials: true,
    },
  });
  return server;
};

startServer();

app.listen({ port: process.env.PORT || 4000 }, () => {
  logger.info(process.env.ORIGIN);
  logger.info(process.env.PORT);
  logger.info(process.env.NODE_ENV);
  logger.info(process.env.PROD_MONGODB);
  logger.info(process.env.DEV_MONGODB);
  if (server instanceof ApolloServer) {
    logger.info(
      `server is listening. http://localhost:4000${server.graphqlPath}`
    );
  }
});
