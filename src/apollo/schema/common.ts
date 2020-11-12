import { gql } from "apollo-server-express";

const typeDef = gql`
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

  type CommonFields {
    id: ID!
    title: String!
    description: String!
    priority: Priority
    status: Status
    created: DateTime
  }
`;

export default typeDef;
