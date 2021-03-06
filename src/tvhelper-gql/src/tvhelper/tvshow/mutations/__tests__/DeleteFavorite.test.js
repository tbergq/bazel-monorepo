// @flow

import { executeTestQuery } from '@tbergq/graphql-test-utils';

import { tvHelperConnection } from '../../../../database/connections';
import UserRepository from '../../../../database/models/user';
import FavoritesRepository from '../../../../database/models/favorites';
import app from '../../../../app';
import { signToken } from '../../../account/mutation/Login';

let createdUserId;

describe('DeleteFavorite', () => {
  beforeEach(async () => {
    const user = await UserRepository.createUser({
      username: 'lol',
      password: 'lol',
      email: 'lol@lol.no',
    });
    createdUserId = user._id;
    await FavoritesRepository.createFavorite(createdUserId, '6');
  });

  afterEach(() =>
    Promise.all([
      tvHelperConnection.collection('users').drop(),
      tvHelperConnection.collection('favorites').drop(),
    ]),
  );

  it('returns success false for wrong user', async () => {
    const res = await executeTestQuery({
      app,
      query: `mutation deleteFavorite {
      deleteFavorite(serieId: "dHZzaG93OjY=") {
        success
      }
    }`,
    }).set('Authorization', signToken({ id: 'lol', username: 'fail' }));

    expect(res.body.data.deleteFavorite.success).toBe(false);
  });

  it('returns success false for wrong serieId', async () => {
    const res = await executeTestQuery({
      app,
      query: `mutation deleteFavorite {
      deleteFavorite(serieId: "dHZzaG93OjY2") {
        success
      }
    }`,
    }).set('Authorization', signToken({ id: createdUserId, username: 'lol' }));

    expect(res.body.data.deleteFavorite.success).toBe(false);
  });

  it('works with existing favorite', async () => {
    const res = await executeTestQuery({
      app,
      query: `mutation deleteFavorite {
      deleteFavorite(serieId: "dHZzaG93OjY=") {
        success
        id
      }
    }`,
    }).set('Authorization', signToken({ id: createdUserId, username: 'lol' }));

    expect(res.body.data).toMatchInlineSnapshot(`
      Object {
        "deleteFavorite": Object {
          "id": "dHZzaG93OjY=",
          "success": true,
        },
      }
    `);
  });
});
