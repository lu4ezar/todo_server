import { gql } from 'apollo-express-server';
import Common from './common';
import { Todo } from '../../generated/graphql';

const typeDef = gql`
  """
  Checklist Type
  """
  type Checklist extends Common {
    todos: [Todo]
  }
`;

export default typeDef;
