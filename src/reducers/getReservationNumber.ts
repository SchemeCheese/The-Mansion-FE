import { createReducer } from '@reduxjs/toolkit';

import { getReservationNumber, getReservationNumberFinish } from 'actions';

import { ReservationNumberState } from 'types';

export const reservationNumberState = {
  operator_code: '',
  reservation_number: '',
};

export default {
  getReservationNumber: createReducer<ReservationNumberState>(reservationNumberState, builder => {
    builder
      .addCase(getReservationNumber, (draft, { payload }) => {
        draft.operator_code = payload.operator_code;
      })
      .addCase(getReservationNumberFinish, (draft, { payload }) => {
        draft.reservation_number = payload.reservation_number;
      });
  }),
};
