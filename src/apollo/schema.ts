import { makeExecutableSchema } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import Common from './typeDefs/shared';
import todosTypeDef from './typeDefs/todos';
import checklistsTypeDef from './typeDefs/checklists';
import { Todos, Checklists } from './resolvers';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [DIRECTIVES, Common, todosTypeDef, checklistsTypeDef],
  resolvers: [Todos, Checklists],
});

export { schema };
