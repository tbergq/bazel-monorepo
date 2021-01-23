// @flow

import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import globalId from '@adeira/graphql-global-id';

import me from './me';

const Test = new GraphQLObjectType({
  name: 'Test',
  description: 'Just for test purpose, will be removed later',
  fields: {
    id: globalId(({ id }) => id),
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    nickname: { type: GraphQLString },
  },
});

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root Query',
  fields: {
    test: {
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      type: Test,
      description: 'Just for testing purpose',
      resolve: (_: mixed, { id }: { id: string, ... }) => ({
        id,
        firstName: 'Tito',
        lastName: 'Bonito',
      }),
    },
    me,
  },
});

export default RootQuery;
