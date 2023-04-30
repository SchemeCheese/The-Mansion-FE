import { createReducer } from '@reduxjs/toolkit';

import { paymentMomoPayReservationDetail, paymentMomoPayReservationDetailSuccess } from 'actions';

import { PaymentMomoPayReservationDetailState } from 'types';

export const paymentMomoPayReservationDetailState = {
  payload: {
    reservation_id: '',
    reservation_detail_id: '',
    amount: 0,
    request_type: '',
  },
  status: '',
};

export default {
  paymentMomoPayReservationDetail: createReducer<PaymentMomoPayReservationDetailState>(
    paymentMomoPayReservationDetailState,
    builder => {
      builder
        .addCase(paymentMomoPayReservationDetail, (draft, { payload }) => {
          draft.payload = payload.payload;
          draft.status = 'INIT';
        })
        .addCase(paymentMomoPayReservationDetailSuccess, draft => {
          draft.status = 'SUCCESS';
        });
    },
  ),
};
