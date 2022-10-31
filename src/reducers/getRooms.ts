import { createReducer } from '@reduxjs/toolkit';

import { getRoomsAction, getRoomsActionFinish } from 'actions';

import { GetRoomState } from 'types';

export const getRoomsState = {
  is_searching: false,
  items: [],
};

export default {
  getRooms: createReducer<GetRoomState>(getRoomsState, builder => {
    builder
      .addCase(getRoomsAction, draft => {
        draft.is_searching = true;
      })
      .addCase(getRoomsActionFinish, (draft, { payload }) => {
        draft.is_searching = false;
        draft.items = payload.items;
      });
  }),
};
