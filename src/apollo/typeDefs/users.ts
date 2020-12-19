import { gql } from 'apollo-server-express';

export default gql`
  """
  User Type
  """
  type User {
    id: ID!
    name: String
    email: String!
    password: String!
    created: DateTime!
  }

  extend type Query {
    me(email: String!): User!
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): AuthPayload!
    loginUser(input: CreateUserInput!): AuthPayload!
    updateUser(input: UpdateUserInput!): User!
    deleteUser(email: String!): User!
  }

  type AuthPayload {
    token: String!
  }

  input CreateUserInput {
    name: String
    email: String!
    password: String!
  }

  input UpdateUserInput {
    name: String
    email: String!
    password: String!
  }
`;
