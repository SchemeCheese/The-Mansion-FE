import { createReducer } from '@reduxjs/toolkit';

import { branchs, branchsFinish } from 'actions';

import { GetBranchsState } from 'types';

export const getBranchsState = {
  data: [],
};

export default {
  getBranchs: createReducer<GetBranchsState>(getBranchsState, builder => {
    builder
      .addCase(branchs, () => {
        console.log('branch');
      })
      .addCase(branchsFinish, (draft, { payload }) => {
        draft.data = payload.data;
      });
  }),
};
