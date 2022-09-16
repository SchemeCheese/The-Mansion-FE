import { createReducer } from '@reduxjs/toolkit';

import { searchRoom, searchRoomFinish, searchRoomReset } from 'actions';

import { RoomSearchState } from 'types';

export const roomSearchState = {
  checkin: '',
  checkout: '',
  room_type: '',
  is_searching: false,
  charges: [],
  total: 0,
};

export default {
  searchRoom: createReducer<RoomSearchState>(roomSearchState, builder => {
    builder
      .addCase(searchRoom, (draft, { payload }) => {
        draft.checkin = payload.checkin ?? '';
        draft.checkout = payload.checkout ?? '';
        draft.room_type = payload.room_type;
        draft.is_searching = true;
      })
      .addCase(searchRoomFinish, (draft, { payload }) => {
        draft.is_searching = false;
        draft.charges = payload.charges;
        draft.total = payload.total;
      })
      .addCase(searchRoomReset, draft => {
        draft.is_searching = false;
        draft.charges = [];
        draft.total = 0;
      });
  }),
};
