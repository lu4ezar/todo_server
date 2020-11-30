import { makeExecutableSchema } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import { shared, todos, checklists, users } from './typeDefs';
import { Todos, Checklists, Users } from './resolvers';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [DIRECTIVES, shared, todos, checklists, users],
  resolvers: [Todos, Checklists, Users],
});

export { schema };
