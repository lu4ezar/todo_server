import { gql } from 'apollo-server-express';

export default gql`
  """
  Todo type
  """
  type Todo @entity(embedded: true) {
    id: ID!
    order: Int!
    title: String! @column
    description: String @column
    priority: Priority!
    completed: Boolean!
    created: DateTime!
    expires: DateTime
    owner: ID!
    checklist: ID
  }

  extend type Query {
    todo(id: ID!): Todo
    todos(checklist: ID): [Todo!]!
  }

  extend type Mutation {
    createTodo(input: CreateTodoInput!): Todo!
    updateTodo(input: UpdateTodoInput!): Todo!
    toggleTodo(id: ID!): Todo!
    deleteTodo(id: ID!): Todo!
    reorderTodos(id: ID!, order: Int!): Todo!
  }

  input CreateTodoInput {
    title: String!
    description: String
    priority: Priority
    completed: Boolean
    checklist: ID
  }

  input UpdateTodoInput {
    id: ID!
    title: String!
    description: String!
    priority: Priority!
    completed: Boolean!
    expires: DateTime
    checklist: ID
  }

  input ReorderTodoInput {
    id: ID!
    order: Int!
  }
`;
