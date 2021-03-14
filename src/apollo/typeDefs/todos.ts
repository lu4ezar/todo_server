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
  }

  # extend type Query {
  #   todo(id: ID!): Todo
  #   todos(checklist: ID): [Todo!]!
  # }

  extend type Mutation {
    createTodo(input: CreateTodoInput!): Checklist!
    updateTodo(input: UpdateTodoInput!): Checklist!
    toggleTodo(id: ID!): Checklist!
    deleteTodo(id: ID!): Checklist!
    reorderTodos(input: ReorderTodoInput!): Checklist!
  }

  input CreateTodoInput {
    checklist: ID
    title: String!
    description: String
    priority: Priority
    completed: Boolean
  }

  input UpdateTodoInput {
    id: ID!
    title: String
    description: String
    priority: Priority
    completed: Boolean
    expires: DateTime
  }

  # input ToggleTodoInput {
  #   checklist: ID!
  #   id: ID!
  # }

  input ReorderTodoInput {
    checklist: ID!
    id: ID!
    order: Int!
  }
`;
