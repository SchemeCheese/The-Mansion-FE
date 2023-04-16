import { createReducer } from '@reduxjs/toolkit';

import { updateHouseKeepingAction, updateHouseKeepingSuccessAction } from 'actions';

import { UpdateHouseKeepingState } from 'types';

export const updateHouseKeepingState = {
  status: '',
};

export default {
  updateHouseKeeping: createReducer<UpdateHouseKeepingState>(updateHouseKeepingState, builder => {
    builder
      .addCase(updateHouseKeepingAction, draft => {
        draft.status = 'INIT';
      })
      .addCase(updateHouseKeepingSuccessAction, draft => {
        draft.status = 'SUCCESS';
      });
  }),
};
