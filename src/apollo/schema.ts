import { makeExecutableSchema } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';
import { shared, todos, checklists, users } from './typeDefs';
import { Todos, Checklists, Users } from './resolvers';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [shared, todos, checklists, users],
  resolvers: [Todos, Checklists, Users],
});

export { schema };
