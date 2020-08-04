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

  input CreateTodoInput {
    title: String!
    description: String
    priority: TodoPriority
    status: TodoStatus
  }

  input UpdateTodoInput {
    title: String
    description: String
    priority: TodoPriority
    status: TodoStatus
  }

  type Query {
    todo(id: ID!): Todo
    todos: [Todo]
  }

  type Mutation {
    createTodo(input: CreateTodoInput!): Todo!
    updateTodo(id: ID!, input: UpdateTodoInput!): Todo!
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
