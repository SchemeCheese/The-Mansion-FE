import { createReducer } from '@reduxjs/toolkit';

import { createPaymentAction, createPaymentSuccess } from 'actions';

import { CreatePaymentState } from 'types';

export const createPaymentState = {
  payload: {
    payment_methods: [],
    sales_info_id: '',
    sales_detail_id: [],
    reservation_detail_id: '',
    paid: {},
  },
  status: '',
};

export default {
  createPayment: createReducer<CreatePaymentState>(createPaymentState, builder => {
    builder
      .addCase(createPaymentAction, (draft, { payload }) => {
        draft.payload = payload.payload;
        draft.status = 'INIT';
      })
      .addCase(createPaymentSuccess, draft => {
        draft.status = 'SUCCESS';
      });
  }),
};
