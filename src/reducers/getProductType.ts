import { createReducer } from '@reduxjs/toolkit';

import { productType, productTypeFinish } from 'actions';

import { ProductTypeState } from 'types';

export const getProductTypeState = {
  data: [],
};

export default {
  getProductType: createReducer<ProductTypeState>(getProductTypeState, builder => {
    builder
      .addCase(productType, () => {
        console.log('productType Reduce');
      })
      .addCase(productTypeFinish, (draft, { payload }) => {
        console.log('Finish', payload);
        draft.data = payload.data;
      });
  }),
};
