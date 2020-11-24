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
	
	extend type Query {
    me: User!
  }

  extend type Mutation {
	createUser(input: CreateUserInput!): User!
    updateUser(input: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
	}
	
	input CreateUserInput {
    email: String!
    hashedPassword: String!
  }

  input UpdateUserInput {
    id: ID!
    email: String
    hashedPassword: String
  }

`;

