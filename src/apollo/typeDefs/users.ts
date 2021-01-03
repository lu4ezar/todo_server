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
    me: User!
    user(email: String!): User!
    users: [User!]!
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): AuthPayload!
    loginUser(input: LoginUserInput!): AuthPayload!
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

  input LoginUserInput {
    email: String!
    password: String!
  }
`;
