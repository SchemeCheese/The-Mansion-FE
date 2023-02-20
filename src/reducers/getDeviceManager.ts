import { createReducer } from '@reduxjs/toolkit';

import { getDeviceManagerAction, getDeviceManagerFinishAction } from 'actions';

import { GetDeviceManagerState } from 'types';

export const getDeviceManagerState = {
  status: '',
  data: [],
};

export default {
  getDeviceManager: createReducer<GetDeviceManagerState>(getDeviceManagerState, builder => {
    builder
      .addCase(getDeviceManagerAction, draft => {
        draft.status = 'INIT';
      })
      .addCase(getDeviceManagerFinishAction, (draft, { payload }) => {
        draft.status = 'SUCCESS';
        draft.data = payload.data;
      });
  }),
};
