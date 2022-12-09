import { createReducer } from '@reduxjs/toolkit';

import { getReservationRoomsAction, getReservationRoomsActionFinish } from 'actions';

import { ReservationRoomState } from 'types';

export const reservationRoomState = {
  data: {},
  is_searching: false,
  type: '',
  checkout_today: {
    booker_info: '',
    current_page: 1,
    per_page: 10,
    room_no: '',
    source_id: '',
    status: '',
  },
  inhouse_today: {
    booker_info: '',
    current_page: 1,
    per_page: 10,
    room_no: '',
    source_id: '',
    status: '',
  },
};

export default {
  reservationRooms: createReducer<ReservationRoomState>(reservationRoomState, builder => {
    builder
      .addCase(getReservationRoomsAction, (draft, { payload }) => {
        draft.is_searching = true;
        draft.type = payload.type;

        if (payload.type === 'inhouse_today') {
          draft.inhouse_today = payload.inhouse_today;
        } else {
          draft.checkout_today = payload.checkout_today;
        }
      })
      .addCase(getReservationRoomsActionFinish, (draft, { payload }) => {
        draft.is_searching = false;
        const dataTemporary = payload.data;

        draft.data =
          draft.type === 'inhouse_today'
            ? {
                ...dataTemporary,
                inhouse_today: payload.data,
              }
            : {
                ...dataTemporary,
                checkout_today: payload.data,
              };
      });
  }),
};
