import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import deepmerge from 'deepmerge';
import { Middleware } from 'redux';
import { configStore } from 'store';
import { PartialDeep } from 'type-fest';

import { initialState } from 'reducers';

import { RootState } from 'types';

type NavigateOptions = {
  hash?: string;
  pathname?: string;
  search?: string;
};

function customRender(ui: React.ReactElement, options: Record<string, any> = {}) {
  const { actions = [], mockDispatch, ...rest } = options;

  const middleware: Middleware[] = [];

  if (mockDispatch) {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    middleware.push(() => next => (action: any) => {
      const actionType = typeof action?.type === 'string' ? action.type : '';

      if (!actionType.startsWith('persist/')) {
        mockDispatch(action);
      }

      return next(action);
    });
  }

  const { store } = configStore({}, middleware);

  actions.forEach(d => store.dispatch(d));

  if (mockDispatch) {
    // mockDispatch.mockClear();
  }

  return {
    ...render(ui, { wrapper: getProviders(store), ...rest }),
    store,
  };
}

export const emptyAction = { type: '', payload: {} };

export function navigate(options: NavigateOptions): void {
  const { location } = window;

  const { hash, pathname = location.pathname, search } = options;
  let url = `${location.protocol}//${location.host}${pathname}`;

  if (search) {
    url += `?${search}`;
  }

  if (hash) {
    url += `#${hash}`;
  }

  // @ts-ignore
  jsdom.reconfigure({ url });
}

function getProviders(store): React.JSXElementConstructor<{ children: React.ReactNode }> {
  return ({ children }) => <Provider store={store}>{children}</Provider>;
}

export function mergeState(patch: PartialDeep<RootState> = {}) {
  return () => deepmerge(initialState, patch);
}

export * from '@testing-library/react';

export { customRender as render };
