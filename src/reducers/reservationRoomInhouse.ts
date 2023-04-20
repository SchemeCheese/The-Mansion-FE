import { createReducer } from '@reduxjs/toolkit';

import {
  getReservationRoomInhouseAction,
  getReservationRoomInhouseActionFinish,
  resetReservationRoomInhouseFilter,
} from 'actions';

import { ReservationRoomInhouseState } from 'types';

export const reservationRoomInhouseState = {
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
  reservationRoomInhouse: createReducer<ReservationRoomInhouseState>(
    reservationRoomInhouseState,
    builder => {
      builder
        .addCase(getReservationRoomInhouseAction, (draft, { payload }) => {
          draft.is_searching = true;
          draft.filter = payload.filter;
        })
        .addCase(getReservationRoomInhouseActionFinish, (draft, { payload }) => {
          draft.is_searching = false;
          draft.data = payload.data;
          draft.total = payload.total;
        })
        .addCase(resetReservationRoomInhouseFilter, draft => {
          draft.filter = reservationRoomInhouseState.filter;
        });
    },
  ),
};
