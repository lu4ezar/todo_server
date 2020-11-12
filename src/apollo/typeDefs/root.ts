import { gql } from 'apollo-server-express';

export default gql`
  """
  Date/Time type
  """
	scalar DateTime
	
	"""
	common fields
	"""
	interface CommonFields {
		id: ID!
    title: String!
    description: String
    priority: Priority!
    status: Status!
    created: DateTime!
	}

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
`;
