import { createReducer } from '@reduxjs/toolkit';

import {
  getReservationGuestCheckinAction,
  getReservationGuestCheckinSuccessAction,
  resetReservationGuestCheckinAction,
} from 'actions';

import { GuestCheckinState } from 'types';

export const guestCheckinState = {
  reservation_info_id: '',
  reservation_detail_id: '',
  data: {},
  is_finish: false,
};

export default {
  guestCheckin: createReducer<GuestCheckinState>(guestCheckinState, builder => {
    builder
      .addCase(getReservationGuestCheckinAction, (draft, { payload }) => {
        draft.reservation_info_id = payload.reservation_info_id;
        draft.reservation_detail_id = payload.reservation_detail_id;
        draft.is_finish = false;
      })
      .addCase(getReservationGuestCheckinSuccessAction, (draft, { payload }) => {
        draft.data = payload.data;
        draft.is_finish = true;
      })
      .addCase(resetReservationGuestCheckinAction, draft => {
        draft.reservation_info_id = '';
        draft.reservation_detail_id = '';
        draft.is_finish = false;
        draft.data = {};
      });
  }),
};
