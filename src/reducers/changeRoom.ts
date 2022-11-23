import { createReducer } from '@reduxjs/toolkit';

import { changeRoomAction, changeRoomActionSuccess } from 'actions';

import { ChangeRoomState } from 'types';

export const changeRoomState = {
  payload: {
    sale_detail_ids: [],
    storage_id: '',
    reservation_id: '',
    reservation_detail_id: '',
  },
  status: '',
};

export default {
  changeRoom: createReducer<ChangeRoomState>(changeRoomState, builder => {
    builder
      .addCase(changeRoomAction, (draft, { payload }) => {
        draft.payload = payload.payload;
        draft.status = 'INIT';
      })
      .addCase(changeRoomActionSuccess, draft => {
        draft.status = 'SUCCESS';
      });
  }),
};
