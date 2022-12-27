import { createReducer } from '@reduxjs/toolkit';

import { branchHeader, branchHeaderFinish } from 'actions';

import { BranchHeaderState } from 'types';

export const getBranchHeaderState = {
  data: [],
};

export default {
  getBranchHeader: createReducer<BranchHeaderState>(getBranchHeaderState, builder => {
    builder
      .addCase(branchHeader, draft => {
        draft.data = [];
      })
      .addCase(branchHeaderFinish, (draft, { payload }) => {
        draft.data = payload.data;
      });
  }),
};
