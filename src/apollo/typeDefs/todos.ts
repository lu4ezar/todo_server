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
		status: Status!
		created: DateTime!
	}

	extend type Query {
    todo(id: ID!): Todo
    todos: [Todo!]!
  }

  extend type Mutation {
    createTodo(input: CreateTodoInput!): Todo!
    updateTodo(id: ID!, input: UpdateTodoInput!): Todo!
    deleteTodo(id: ID!): Todo!
    reorderTodos(id: ID!, order: Int!): Todo!
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

`;
