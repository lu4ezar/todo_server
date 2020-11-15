import { gql } from 'apollo-server-express';
//type Checklist implements CommonFields {

export default gql`
  """
  Checklist Type
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
	
	extend type Query {
    checklist(id: ID!): Checklist
    checklists: [Checklist!]!
  }

  extend type Mutation {
    createChecklist(input: CreateChecklistInput!): Checklist!
    updateChecklist(id: ID!, input: UpdateChecklistInput!): Checklist!
    deleteChecklist(id: ID!): Checklist!
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

`;
