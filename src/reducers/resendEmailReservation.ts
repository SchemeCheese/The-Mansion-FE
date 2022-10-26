import { createReducer } from '@reduxjs/toolkit';

import { resendEmailReservationAction, resendEmailReservationSuccessAction } from 'actions';

import { ResendEmailReservationState } from 'types';

export const resendEmailReservationState = {
  status: '',
  reservation_id: '',
};

export default {
  resendEmailReservation: createReducer<ResendEmailReservationState>(
    resendEmailReservationState,
    builder => {
      builder
        .addCase(resendEmailReservationAction, (draft, { payload }) => {
          draft.status = 'INIT';
          draft.reservation_id = payload.reservation_id;
        })
        .addCase(resendEmailReservationSuccessAction, draft => {
          draft.status = 'SUCCESS';
        });
    },
  ),
};
