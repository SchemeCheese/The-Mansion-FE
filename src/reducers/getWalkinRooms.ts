import { createReducer } from '@reduxjs/toolkit';

import { getWalkinRoomsAction, getWalkinRoomsActionFinish } from 'actions';

import { GetWalkinRoomState } from 'types';

export const getWalkinRoomsState = {
  room_type: '',
  room_number: '',
  is_smocking: '',
  is_searching: false,
  items: [],
};

export default {
  getWalkinRooms: createReducer<GetWalkinRoomState>(getWalkinRoomsState, builder => {
    builder
      .addCase(getWalkinRoomsAction, (draft, { payload }) => {
        draft.room_number = payload.room_number;
        draft.room_type = payload.room_type;
        draft.is_smocking = payload.is_smocking;

        draft.is_searching = true;
      })
      .addCase(getWalkinRoomsActionFinish, (draft, { payload }) => {
        draft.is_searching = false;
        draft.items = payload.items;
      });
  }),
};
