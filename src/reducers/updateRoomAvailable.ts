import { createReducer } from '@reduxjs/toolkit';

import {
  updateReservationSuccess,
  updateRoomAvailableAction,
  updateRoomAvailableSuccessAction,
} from 'actions';

import { UpdateRoomAvailableState } from 'types';

export const updateRoomAvailableState = {
  payload: {
    room_number: 0,
    room_id: '',
    start_date: '',
    end_date: '',
    enabled_day: [],
  },
  status: '',
};

export default {
  updateRoomAvailable: createReducer<UpdateRoomAvailableState>(
    updateRoomAvailableState,
    builder => {
      builder
        .addCase(updateRoomAvailableAction, (draft, { payload }) => {
          draft.payload = payload.payload;
          draft.status = 'INIT';
        })
        .addCase(updateRoomAvailableSuccessAction, draft => {
          draft.status = 'SUCCESS';
        });
    },
  ),
};
