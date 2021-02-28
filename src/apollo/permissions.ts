import { allow, rule, shield } from 'graphql-shield';

const isAdmin = rule()((_, __, ctx) => ctx.user.isAdmin);

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
    User: isAdmin,
  },
  { allowExternalErrors: true }
);
