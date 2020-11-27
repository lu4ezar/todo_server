import { gql } from 'apollo-server-express';

export default gql`
  """
  User Type
  """
  type User {
    id: ID!
    email: String!
    hashedPassword: String!
    created: DateTime!
  }

  type Token {
    token: String!
  }

  extend type Query {
    me(email: String!): User!
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): Token!
    loginUser(input: CreateUserInput!): Token!
    updateUser(input: UpdateUserInput!): User!
    deleteUser(email: String!): User!
  }

  input CreateUserInput {
    email: String!
    hashedPassword: String!
  }

  input UpdateUserInput {
    email: String!
    hashedPassword: String!
  }
`;
