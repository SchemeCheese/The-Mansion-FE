import { createReducer } from '@reduxjs/toolkit';

import { getRoomOption, getRoomOptionFinish } from 'actions';

import { RoomOptionState } from 'types';

export const roomOptionState = {
  data: [],
  is_finish: false,
};

export default {
  getRoomOption: createReducer<RoomOptionState>(roomOptionState, builder => {
    builder
      .addCase(getRoomOption, draft => {
        draft.is_finish = false;
      })
      .addCase(getRoomOptionFinish, (draft, { payload }) => {
        draft.data = payload.data;
        draft.is_finish = true;
      });
  }),
};
