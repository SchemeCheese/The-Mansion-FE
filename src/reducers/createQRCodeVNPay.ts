import { createReducer } from '@reduxjs/toolkit';

import { createQRCodeVNPayAction, createQRCodeVNPaySuccessAction } from 'actions';

import { CreateQRCodeVNPayState } from 'types';

export const createQRCodeVNPayState = {
  payload: {
    amount: 0,
    txn_id: '',
    bill_number: '',
    txn_desc: '',
    reservation_info_id: '',
    reservation_detail_id: '',
  },
  status: '',
  result: {},
};

export default {
  createQRCodeVNPay: createReducer<CreateQRCodeVNPayState>(createQRCodeVNPayState, builder => {
    builder
      .addCase(createQRCodeVNPayAction, (draft, { payload }) => {
        draft.payload = payload.payload;
        draft.status = 'INIT';
      })
      .addCase(createQRCodeVNPaySuccessAction, (draft, { payload }) => {
        draft.status = 'SUCCESS';
        draft.result = payload.result;
      });
  }),
};
