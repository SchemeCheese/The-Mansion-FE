import { createReducer } from '@reduxjs/toolkit';

import { addDiskAction, addDiskActionSuccess } from 'actions';

import { AddDiskState } from 'types';

export const addDiskState = {
  payload: {
    name: '',
  },
  status: '',
};

export default {
  addDisk: createReducer<AddDiskState>(addDiskState, builder => {
    builder
      .addCase(addDiskAction, (draft, { payload }) => {
        draft.payload = payload.payload;
        draft.status = 'INIT';
      })
      .addCase(addDiskActionSuccess, draft => {
        draft.status = 'SUCCESS';
      });
  }),
};
