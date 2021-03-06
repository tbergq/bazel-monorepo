// @flow

import adeiraFetch from '@adeira/fetch';
import { invariant } from '@adeira/js';
import { TOKEN_KEY } from '@tj/services/constants';

const { BASE_URL } = process.env;

invariant(BASE_URL != null, 'Missing required env variable, BASE_URL');

type FetchOptions = {|
  ...$Exact<RequestOptions>,
  +fetchTimeout?: number,
  +retryDelays?: $ReadOnlyArray<number>,
|};

type Headers = {
  'Content-Type'?: string,
  'Authorization'?: string,
  ...
};

export default async function fetch<P>(url: string, options?: $Exact<FetchOptions>): Promise<P> {
  const token = localStorage.getItem(TOKEN_KEY);

  const headers: Headers = {
    ...options?.headers,
  };
  if (token != null) {
    headers.Authorization = `Token ${token}`;
  }
  if (headers['Content-Type'] == null) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await adeiraFetch(`${BASE_URL}${url}`, {
    ...options,
    // $FlowExpectedError[incompatible-call]
    headers,
  });

  if (res.status === 204 && res.ok) {
    // $FlowExpectedError[incompatible-return]
    return undefined;
  }
  return res.json();
}

// eslint-disable-next-line no-unused-vars
export const nullFetcher = (...args: any): null => null;
