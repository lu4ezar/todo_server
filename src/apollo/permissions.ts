import { allow, rule, shield } from 'graphql-shield';

const isAuthorized = rule()((_, __, { user }) => user && true);

export const permissions = shield(
  {
    Query: {
      '*': isAuthorized,
    },

    Mutation: {
      '*': isAuthorized,
      createUser: allow,
      loginUser: allow,
    },
  },
  { allowExternalErrors: true }
);
