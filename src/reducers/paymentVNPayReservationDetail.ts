import { createReducer } from '@reduxjs/toolkit';

import { paymentVNPayReservationDetail, paymentVNPayReservationDetailSuccess } from 'actions';

import { PaymentVNPayReservationDetailState } from 'types';

export const paymentVNPayReservationDetailState = {
  payload: {
    reservation_id: '',
    reservation_detail_id: '',
    amount: 0,
    bank_code: '',
  },
  status: '',
};

export default {
  paymentVNPayReservationDetail: createReducer<PaymentVNPayReservationDetailState>(
    paymentVNPayReservationDetailState,
    builder => {
      builder
        .addCase(paymentVNPayReservationDetail, (draft, { payload }) => {
          draft.payload = payload.payload;
          draft.status = 'INIT';
        })
        .addCase(paymentVNPayReservationDetailSuccess, draft => {
          draft.status = 'SUCCESS';
        });
    },
  ),
};
