import { gql } from 'apollo-server-express';

const typeDefs = gql`
  """
  Date/Time type
  """
  scalar DateTime

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

  """
  Todo type
  """
  type Todo {
    id: ID!
    title: String!
    description: String
    priority: Priority!
    status: Status!
    created: DateTime!
  }

  """
  Checklist type
  """
  type Checklist {
    id: ID!
    title: String!
    description: String
    priority: Priority!
    status: Status!
    created: DateTime!
    todos: [Todo!]!
  }

  input CreateTodoInput {
    title: String!
    description: String
    priority: Priority
    status: Status
  }

  input UpdateTodoInput {
    title: String
    description: String
    priority: Priority
    status: Status
  }

  input CreateChecklistInput {
    title: String!
    description: String
    priority: Priority
    status: Status
  }

  input UpdateChecklistInput {
    title: String
    description: String
    priority: Priority
    status: Status
  }

  type Query {
    todo(id: ID!): Todo
    todos: [Todo]
  }

  extend type Query {
    checklist(id: ID!): Checklist
    checklists: [Checklist!]!
  }

  type Mutation {
    createTodo(input: CreateTodoInput!): Todo!
    updateTodo(id: ID!, input: UpdateTodoInput!): Todo!
    deleteTodo(id: ID!): Todo!
  }

  extend type Mutation {
    createChecklist(input: CreateChecklistInput!): Checklist!
    updateChecklist(id: ID!, input: UpdateChecklistInput!): Checklist!
    deleteChecklist(id: ID!): Checklist!
  }
`;

export default typeDefs;
