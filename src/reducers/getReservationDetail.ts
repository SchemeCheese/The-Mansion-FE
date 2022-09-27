import { createReducer } from '@reduxjs/toolkit';

import { getReservationDetail, getReservationDetailFinish, resetReservationDetail } from 'actions';

import { ReservationDetailState } from 'types';

export const reservationDetailState = {
  data: {},
  reservation_id: '',
  reservation_detail_id: '',
  is_finish: false,
};

export default {
  getReservationDetail: createReducer<ReservationDetailState>(reservationDetailState, builder => {
    builder
      .addCase(getReservationDetail, (draft, { payload }) => {
        draft.reservation_id = payload.reservation_id;
        draft.reservation_detail_id = payload.reservation_detail_id;
        draft.is_finish = false;
      })
      .addCase(getReservationDetailFinish, (draft, { payload }) => {
        draft.data = payload.data;
        draft.is_finish = true;
      })
      .addCase(resetReservationDetail, draft => {
        draft.reservation_id = '';
        draft.reservation_detail_id = '';
        draft.is_finish = false;
        draft.data = {};
      });
  }),
};
