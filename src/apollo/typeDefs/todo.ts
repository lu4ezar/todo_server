import { gql } from 'apollo-server-express';
// import Common from './common';

export default gql`
  """
  Todo type
  """
	type Todo implements CommonFields {
		id:
	}

	type Query {
    todo(id: ID!): Todo
    todos: [Todo!]!
  }

  type Mutation {
    createTodo(input: CreateTodoInput!): Todo!
    updateTodo(id: ID!, input: UpdateTodoInput!): Todo!
    deleteTodo(id: ID!): Todo!
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
