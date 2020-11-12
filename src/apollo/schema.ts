import { gql } from 'apollo-server-express';

const typeDefs = gql`
  """
  Date/Time type
  """
  scalar DateTime

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
`;

export default typeDefs;
