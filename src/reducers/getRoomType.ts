import { createReducer } from '@reduxjs/toolkit';

import { getRoomType, getRoomTypeFinish } from 'actions';

import { ReservationTypeState } from 'types';

export const roomTypeState = {
  data: [],
  is_finish: false,
};

export default {
  getRoomType: createReducer<ReservationTypeState>(roomTypeState, builder => {
    builder
      .addCase(getRoomType, draft => {
        draft.is_finish = false;
      })
      .addCase(getRoomTypeFinish, (draft, { payload }) => {
        draft.data = payload.data;
        draft.is_finish = true;
      });
  }),
};
