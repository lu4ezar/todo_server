
import { gql } from 'apollo-server-express';
import Common from './common';

const typeDefs = gql`
  """
  Todo type
  """
  type Todo extends Common {}
`;

export default typeDefs;

