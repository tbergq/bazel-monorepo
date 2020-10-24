// @flow

import type { ComponentType } from 'react';

import useInjectSxStyles from '../components/use-inject-sx-styles';
import useIsLoggedIn from '../components/use-is-logged-in';

export default (function Dashboard() {
  useInjectSxStyles();
  useIsLoggedIn();
  return <div>TODO</div>;
}: ComponentType<{}>);
