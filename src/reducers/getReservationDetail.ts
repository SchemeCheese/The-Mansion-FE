import { createReducer } from '@reduxjs/toolkit';

import { getReservationDetail, getReservationDetailFinish } from 'actions';

import { ReservationDetailState } from 'types';

export const reservationDetailState = {
  data: {},
  id: '',
  is_finish: false,
};

export default {
  getReservationDetail: createReducer<ReservationDetailState>(reservationDetailState, builder => {
    builder
      .addCase(getReservationDetail, (draft, { payload }) => {
        draft.id = payload.id;
        draft.is_finish = false;
      })
      .addCase(getReservationDetailFinish, (draft, { payload }) => {
        draft.data = payload.data;
        draft.is_finish = true;
      });
  }),
};
