// @flow

import { executeTestQuery } from '@tbergq/graphql-test-utils';

import app from '../../../app';
import connection from '../../../database/connection';
import UserModel from '../../../database/models/users';
import { signToken } from '../../../middleware/auth';

let userId;

beforeEach(async () => {
  const user = await UserModel.createUser({
    email: 'test@test.no',
    password: '123456',
  });
  userId = user._id;
});

afterEach(async () => {
  await connection.collection('users').drop();
});

it('returns unauthorized for not logged in user', async () => {
  const res = await executeTestQuery({
    app,
    query: `query viewerQuery {
    viewer {
      __typename
    }
  }`,
  });
  expect(res.body.data.viewer.__typename).toBe('Unauthorized');
});

it('returns user for logged in user', async () => {
  const res = await executeTestQuery({
    app,
    query: `query viewerQuery {
    viewer {
      ... on User {
        identity {
          email
        }
      }
    }
  }`,
  }).set('Authorization', signToken({ email: 'test@test.no', id: userId }));

  expect(res.body.data.viewer.identity.email).toBe('test@test.no');
});
