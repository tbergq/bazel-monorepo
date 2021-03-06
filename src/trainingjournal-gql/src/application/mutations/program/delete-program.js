// @flow

import { type GraphQLFieldConfig } from 'graphql';
import { ProgramModel } from '@tj-gql/infrastructure/models';

import createRangeDeleteMutation from '../common/range-delete-mutation';

const deleteProgram: GraphQLFieldConfig<any, any> = createRangeDeleteMutation((programId, userId) =>
  ProgramModel.deleteProgram(programId, userId),
);

export default deleteProgram;
