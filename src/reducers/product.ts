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
        console.log('searchProduct Reduce');
        draft.is_searching = true;
      })
      .addCase(searchProductFinish, (draft, { payload }) => {
        console.log('Finish', payload);
        draft.is_searching = false;
        draft.data = payload.data;
      });
  }),
};
