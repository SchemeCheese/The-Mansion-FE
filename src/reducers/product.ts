import { createReducer } from '@reduxjs/toolkit';

import { searchProduct, searchProductFinish } from 'actions';

import { ProductSearchState } from 'types';

export const productSearchState = {
  is_searching: false,
  data: [],
};

export default {
  product: createReducer<ProductSearchState>(productSearchState, builder => {
    builder
      .addCase(searchProduct, draft => {
        draft.is_searching = true;
      })
      .addCase(searchProductFinish, (draft, { payload }) => {
        draft.is_searching = false;
        draft.data = payload.data;
      });
  }),
};
