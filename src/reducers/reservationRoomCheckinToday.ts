import { createReducer } from '@reduxjs/toolkit';

import {
  getReservationRoomCheckinTodayAction,
  getReservationRoomCheckinTodayActionFinish,
  resetReservationRoomCheckinFilter,
} from 'actions';

import { ReservationRoomInhouseState } from 'types';

export const reservationRoomCheckinTodayState = {
  data: [],
  is_searching: false,
  total: 0,
  filter: {
    booker_info: '',
    current_page: 1,
    per_page: 10,
    room_no: '',
    source_id: '',
    status: '',
  },
};

export default {
  reservationRoomCheckinToday: createReducer<ReservationRoomInhouseState>(
    reservationRoomCheckinTodayState,
    builder => {
      builder
        .addCase(getReservationRoomCheckinTodayAction, (draft, { payload }) => {
          draft.is_searching = true;
          draft.filter = payload.filter;
        })
        .addCase(getReservationRoomCheckinTodayActionFinish, (draft, { payload }) => {
          draft.is_searching = false;
          draft.data = payload.data;
          draft.total = payload.total;
        })
        .addCase(resetReservationRoomCheckinFilter, draft => {
          draft.filter = reservationRoomCheckinTodayState.filter;
        });
    },
  ),
};
