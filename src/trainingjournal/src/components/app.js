// @flow

import { type Node, useEffect, lazy, Suspense, useRef } from 'react';
import { RouterRenderer, RoutingContext, createRouter } from '@tbergq/router';
import { Spinner, Toast } from '@tbergq/components';
import { createBrowserHistory } from 'history';
import { init, IntlVariations } from 'fbt';
import { QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import Routes, { queryClient } from './router';
import getLanguage from './get-language';
import translations from '../../translatedFbts.json';
import './app.css';
import { LoginProvider } from './login-context';
import environment from '../relay/environment';

const Navbar = lazy(() => import('./navbar'));
const router = createRouter(Routes, createBrowserHistory());

export default function App(): Node {
  const locale = getLanguage();
  const htmlRef = useRef(document.querySelector('html'));
  useEffect(() => {
    init({
      translations,
      hooks: {
        getViewerContext: () => {
          return {
            locale,
            GENDER: IntlVariations.GENDER_UNKNOWN,
          };
        },
      },
    });
    if (htmlRef.current != null) {
      htmlRef.current.setAttribute('lang', locale.substring(0, 2));
    }
  }, [locale]);
  return (
    <QueryClientProvider client={queryClient}>
      <RoutingContext.Provider value={router.context}>
        <LoginProvider>
          <RelayEnvironmentProvider environment={environment}>
            <RecoilRoot>
              <header className="Trainingjournal__header">
                <Suspense fallback="">
                  <Navbar />
                </Suspense>
              </header>
              <main className="Trainingjournal__container">
                <RouterRenderer loader={<Spinner />} />
                <Toast />
              </main>
            </RecoilRoot>
          </RelayEnvironmentProvider>
        </LoginProvider>
      </RoutingContext.Provider>
    </QueryClientProvider>
  );
}
