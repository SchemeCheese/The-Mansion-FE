import { createReducer } from '@reduxjs/toolkit';

import { branchManager, branchManagerFinish } from 'actions';

import { BranchManagerState } from 'types';

export const getBranchManagerState = {
  DataElectric: [],
  DataWater: [],
  status: '',
};

export default {
  getBranchManager: createReducer<BranchManagerState>(getBranchManagerState, builder => {
    builder
      .addCase(branchManager, draft => {
        draft.status = 'INIT';
        draft.DataElectric = [];
        draft.DataWater = [];
      })
      .addCase(branchManagerFinish, (draft, { payload }) => {
        draft.status = 'SUCCESS';
        draft.DataElectric = payload.DataElectric;
        draft.DataWater = payload.DataWater;
      });
  }),
};
