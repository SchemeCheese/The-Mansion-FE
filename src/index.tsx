import './i18n';
import 'antd/dist/reset.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { configStore } from 'store';

import { showAlert } from 'actions';

import ErrorHandler from 'components/ErrorHandler';
import Loader from 'components/Loader';
import Reload from 'components/Reload';
import GlobalStyles from 'containers/GlobalStyles';
import { appColor, colors } from 'modules/theme';
import { AntdApp, ConfigProvider } from 'ui/antd';

import reportWebVitals from './reportWebVitals';
import Root from './Root';
import { register } from './serviceWorkerRegistration';

const APP_RELEASE_STORAGE_KEY = 'pms_app_release';
const APP_RELEASE = [APP__VERSION, APP__GITHASH].filter(Boolean).join(':');

const syncReleaseSession = () => {
  const previousRelease = window.localStorage.getItem(APP_RELEASE_STORAGE_KEY);

  if (previousRelease && previousRelease !== APP_RELEASE) {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('facility_id');
    window.localStorage.removeItem('branch_id');
    window.localStorage.removeItem('persist:rrsb');
  }

  window.localStorage.setItem(APP_RELEASE_STORAGE_KEY, APP_RELEASE);
};

syncReleaseSession();

const { persistor, store } = configStore();
const HelmetProviderCompat: any = HelmetProvider;

window.store = store;

if (process.env.NODE_ENV === 'development') {
  const shouldIgnoreResizeObserverError = (message?: string | null) => {
    if (!message) {
      return false;
    }

    return message.toLowerCase().includes('resizeobserver loop');
  };

  const suppressResizeObserverError = (event: ErrorEvent) => {
    const message = event.message || event.error?.message;

    if (shouldIgnoreResizeObserverError(message)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };

  // React refresh overlay may capture this in the capture phase.
  window.addEventListener('error', suppressResizeObserverError, true);

  // Some browsers/frameworks still route this via window.onerror.
  window.onerror = (message, source, lineno, colno, error) => {
    const normalized = (typeof message === 'string' ? message : '') || error?.message || '';

    if (shouldIgnoreResizeObserverError(normalized)) {
      return true;
    }

    return false;
  };

  window.addEventListener('unhandledrejection', event => {
    const reason = event.reason as { message?: string } | string | undefined;
    const message = typeof reason === 'string' ? reason : reason?.message;

    if (shouldIgnoreResizeObserverError(message)) {
      event.preventDefault();
    }
  });
}

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: colors.pattron,
            colorInfo: appColor,
          },
        }}
      >
        <AntdApp>
          <PersistGate loading={<Loader block size={100} />} persistor={persistor}>
            <ErrorBoundary FallbackComponent={ErrorHandler}>
              <HelmetProviderCompat>
                <BrowserRouter
                  future={{
                    v7_relativeSplatPath: true,
                    v7_startTransition: true,
                  }}
                >
                  <Root />
                </BrowserRouter>
              </HelmetProviderCompat>
            </ErrorBoundary>
            <GlobalStyles />
          </PersistGate>
        </AntdApp>
      </ConfigProvider>
    </Provider>,
  );
}

/* istanbul ignore next */
register({
  onUpdate: () => {
    store.dispatch(showAlert(<Reload />, { id: 'sw-update', icon: 'bolt', timeout: 0 }));
  },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log); // eslint-disable-line no-console
