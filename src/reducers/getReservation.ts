import { createReducer } from '@reduxjs/toolkit';

import { getReservation, getReservationFinish, resetReservation } from 'actions';

import { GetReservationState } from 'types';

export const getReservationState = {
  reservation_id: '',
  data: {},
  is_finish: false,
};

export default {
  getReservation: createReducer<GetReservationState>(getReservationState, builder => {
    builder
      .addCase(getReservation, (draft, { payload }) => {
        draft.reservation_id = payload.reservation_id;
        draft.is_finish = false;
      })
      .addCase(getReservationFinish, (draft, { payload }) => {
        draft.data = payload.data;
        draft.is_finish = true;
      })
      .addCase(resetReservation, draft => {
        draft.reservation_id = '';
        draft.is_finish = false;
        draft.data = {};
      });
  }),
};
