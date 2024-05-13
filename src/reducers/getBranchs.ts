import { createReducer } from '@reduxjs/toolkit';

import { branchs, branchsFinish } from 'actions';

import { GetBranchsState } from 'types';

export const getBranchsState = {
  cached: true,
  data: [],
  updatedAt: 0,
  is_searching: false,
};

export default {
  getBranchs: createReducer<GetBranchsState>(getBranchsState, builder => {
    builder
      .addCase(branchs, draft => {
        draft.is_searching = true;
      })
      .addCase(branchsFinish, (draft, { payload }) => {
        draft.is_searching = false;
        draft.data = payload.data;
        draft.updatedAt = payload.updatedAt;
      });
  }),
};
