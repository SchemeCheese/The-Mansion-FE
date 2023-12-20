import { createReducer } from '@reduxjs/toolkit';

import { changeDiskAction, changeDiskActionSuccess } from 'actions';

import { ChangeDiskState } from 'types';

export const changeDiskState = {
  payload: {
    reservation_detail_id: '',
    sale_detail_ids: [],
    storage_id: '',
  },
  status: '',
};

export default {
  changeDisk: createReducer<ChangeDiskState>(changeDiskState, builder => {
    builder
      .addCase(changeDiskAction, (draft, { payload }) => {
        draft.payload = payload.payload;
        draft.status = 'INIT';
      })
      .addCase(changeDiskActionSuccess, draft => {
        draft.status = 'SUCCESS';
      });
  }),
};
