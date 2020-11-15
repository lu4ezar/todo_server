import { gql } from 'apollo-server-express';

export default gql`
  """
  Date/Time type
  """
  scalar DateTime

	type Query

	type Mutation

  enum Priority {
    LOW
    NORMAL
    HIGH
  }

  enum Status {
    ACTIVE
    COMPLETED
    EXPIRED
  }
`;

/*
"""
  common fields
  """
  interface CommonFields {
    id: ID!
    title: String!
    description: String
    priority: Priority!
    status: Status!
    created: DateTime!
  }

	*/