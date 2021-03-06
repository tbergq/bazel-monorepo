// @flow

import { type Node } from 'react';
import { Helmet } from 'react-helmet';
import { usePreloadedQuery, graphql } from 'react-relay/hooks';
import { type GraphQLTaggedNode } from 'relay-runtime';

import type { exercisesQuery } from './__generated__/exercisesQuery.graphql';
import BaseExerciseList from './list/base-exercise-list';

export const query: GraphQLTaggedNode = graphql`
  query exercisesQuery {
    me {
      ...baseExerciseList_exercises
    }
  }
`;

type Props = {
  prepared: {
    query: any,
  },
};

export default function Exercises({ prepared }: Props): Node {
  const data = usePreloadedQuery<exercisesQuery>(query, prepared.query);

  return (
    <>
      <Helmet>
        <title>Trainingjournal | exercises </title>
      </Helmet>
      <BaseExerciseList exercisesRef={data.me} />
    </>
  );
}
