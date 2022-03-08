import { rule, shield, allow } from 'graphql-shield';

const isAuthenticated = rule({ cache: 'contextual' })(
  (_, __, ctx) => ctx.user != null
);

const isAuthorized = rule({ cache: 'strict' })(
  (_, __, ctx) => !!ctx.user.email
);

// const isTodoOwner = rule({
//   cache: 'strict',
//   fragment: 'fragment TodoOwner on Todo { id }',
// })(async ({ id }, args, ctx, info) => ctx.dataSources.Todo.exists.Todo)({
//   id,
//   owner: { id: ctx.user.id },
// });

// const isChecklistOwner = rule({
//   cache: 'no_cache',
//   fragment: 'fragment OwnerId on Checklist { id }',
// })(async ({ id }, _, ctx) => {
//   return await ctx.db({
//     id,
//     owner: { id: ctx.user.id },
//   });
// });

const isAdmin = rule()((_, __, ctx) => ctx.user.isAdmin);

const permissions = shield(
  {
    Query: {
      '*': isAuthenticated,
    },

    Mutation: {
      '*': isAuthorized,
      createUser: allow,
      loginUser: allow,
    },
    // Checklist: isChecklistOwner,
    // Todo: isAuthorized,
    User: isAdmin,
  },
  { allowExternalErrors: true }
);

export default permissions;
