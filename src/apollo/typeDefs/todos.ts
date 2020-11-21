import { gql } from 'apollo-server-express';

export default gql`
  """
  Todo type
  """
  type Todo {
    id: ID!
    order: Int!
    title: String!
    description: String
    priority: Priority!
    completed: Boolean!
    created: DateTime!
    expires: DateTime!
    checklist: ID!
  }

  extend type Query {
    todo(id: ID!): Todo
    todos: [Todo!]!
  }

  extend type Mutation {
    createTodo(input: CreateTodoInput!): Todo!
    updateTodo(input: UpdateTodoInput!): Todo!
    deleteTodo(id: ID!): Todo!
    reorderTodos(id: ID!, order: Int!): Todo!
  }

  input CreateTodoInput {
    title: String!
    description: String
    priority: Priority
    completed: Boolean!
  }

  input UpdateTodoInput {
    id: ID!
    title: String
    description: String
    priority: Priority
    completed: Boolean
    expires: DateTime!
  }

  input ReorderTodoInput {
    id: ID!
    order: Int!
  }
`;
