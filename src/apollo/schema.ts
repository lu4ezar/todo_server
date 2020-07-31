import { gql } from 'apollo-server-express';

const typeDefs = gql`
  """
  Date/Time type
  """
  scalar DateTime

  """
  Todo type
  """
  type Todo {
    id: ID
    title: String!
    description: String!
    priority: TodoPriority
    status: TodoStatus
    created: DateTime
  }

  input TodoInput {
    title: String!
    description: String!
    priority: TodoPriority!
    status: TodoStatus!
  }

  type Query {
    todo(id: ID!): Todo
    todos: [Todo]
  }

  type Mutation {
    createTodo(input: TodoInput!): Todo!
    updateTodo(id: ID!, input: TodoInput!): Todo!
    deleteTodo(id: ID!): Todo!
  }

  enum TodoPriority {
    LOW
    NORMAL
    HIGH
  }

  enum TodoStatus {
    ACTIVE
    COMPLETED
    EXPIRED
  }
`;

export default typeDefs;
