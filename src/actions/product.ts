import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { ProductSearch, ProductSearchResult } from 'types';

export const searchProduct = createAction(ActionTypes.PRODUCT_SEARCH, (payload: ProductSearch) =>
  actionPayload(payload),
);

export const searchProductFinish = createAction(
  ActionTypes.PRODUCT_SEARCH_FINISH,
  (payload: ProductSearchResult) => actionPayload(payload),
);
