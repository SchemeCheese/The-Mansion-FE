import { createReducer } from '@reduxjs/toolkit';

import {
  getReservationCheckoutByRoomNoAction,
  getReservationCheckoutByRoomNoActionSuccess,
  resetReservationCheckoutByRoomNoAction,
} from 'actions';

import { ReservationCheckoutFromRoomNoState } from 'types';

export const getReservationCheckoutFromRoomNoState = {
  data: {},
  room_no: '',
  is_finish: false,
};

export default {
  getReservationCheckoutFromRoomNo: createReducer<ReservationCheckoutFromRoomNoState>(
    getReservationCheckoutFromRoomNoState,
    builder => {
      builder
        .addCase(getReservationCheckoutByRoomNoAction, (draft, { payload }) => {
          draft.room_no = payload.room_no;
          draft.is_finish = false;
        })
        .addCase(getReservationCheckoutByRoomNoActionSuccess, (draft, { payload }) => {
          draft.data = payload.data;
          draft.is_finish = true;
        })
        .addCase(resetReservationCheckoutByRoomNoAction, draft => {
          draft.room_no = '';
          draft.is_finish = false;
          draft.data = {};
        });
    },
  ),
};
