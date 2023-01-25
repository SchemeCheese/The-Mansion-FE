import { createReducer } from '@reduxjs/toolkit';

import {
  getReservationRoomCheckoutTodayAction,
  getReservationRoomCheckoutTodayActionFinish,
} from 'actions';

import { ReservationRoomInhouseState } from 'types';

export const reservationRoomCheckoutTodayState = {
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
  reservationRoomCheckoutToday: createReducer<ReservationRoomInhouseState>(
    reservationRoomCheckoutTodayState,
    builder => {
      builder
        .addCase(getReservationRoomCheckoutTodayAction, (draft, { payload }) => {
          draft.is_searching = true;
          draft.filter = payload.filter;
        })
        .addCase(getReservationRoomCheckoutTodayActionFinish, (draft, { payload }) => {
          draft.is_searching = false;
          draft.data = payload.data;
          draft.total = payload.total;
        });
    },
  ),
};
