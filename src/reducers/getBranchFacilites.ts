import { createReducer } from '@reduxjs/toolkit';

import { branchFacilites, branchFacilitesFinish } from 'actions';

import { GetBranchFacilitiesState } from 'types';

export const getBranchFacilitesState = {
  branch_id: '',
  data: [],
  branchFacilitySelected: '',
};

export default {
  getBranchFacilites: createReducer<GetBranchFacilitiesState>(getBranchFacilitesState, builder => {
    builder
      .addCase(branchFacilites, (draft, { payload }) => {
        draft.branch_id = payload.branchId;
      })
      .addCase(branchFacilitesFinish, (draft, { payload }) => {
        draft.data = payload.data;
      });
  }),
};
