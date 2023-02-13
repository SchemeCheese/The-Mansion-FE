import { createReducer } from '@reduxjs/toolkit';

import { checkoutAction, checkoutSuccessAction } from 'actions';

import { CheckoutState } from 'types';

export const checkoutState = {
  payload: {
    reservation_id: '',
    reservation_detail_id: '',
    sales_info_id: '',
    sales_detail_id: [],
    payment_methods: [],
    paid: {},
  },
  status: '',
};

export default {
  checkout: createReducer<CheckoutState>(checkoutState, builder => {
    builder
      .addCase(checkoutAction, (draft, { payload }) => {
        draft.payload = payload.payload;
        draft.status = 'INIT';
      })
      .addCase(checkoutSuccessAction, draft => {
        draft.status = 'SUCCESS';
      });
  }),
};
