import { gql } from 'apollo-server-express';

export default gql`
  """
  Checklist Type
  """
  type Checklist @entity {
    id: ID!
    owner: ID!
    order: Int!
    title: String! @column
    description: String
    priority: Priority!
    completed: Boolean!
    created: DateTime!
    expires: DateTime!
    todos: [Todo!]! @embedded
  }

  extend type Query {
    checklist(id: ID!): Checklist
    checklists: [Checklist!]!
  }

  extend type Mutation {
    createChecklist(input: CreateChecklistInput!): Checklist!
    updateChecklist(input: UpdateChecklistInput!): Checklist!
    deleteChecklist(id: ID!): Checklist!
    reorderChecklists(id: ID!, order: Int!): Checklist!
  }

  input CreateChecklistInput {
    title: String!
    description: String
    priority: Priority
    completed: Boolean
  }

  input UpdateChecklistInput {
    id: ID!
    title: String!
    description: String!
    priority: Priority!
    completed: Boolean!
    expires: DateTime
  }
`;
