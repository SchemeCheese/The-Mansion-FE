import { createReducer } from '@reduxjs/toolkit';

import { branchSelected } from 'actions';

import { BranchInfoState } from 'types';

export const branchInfoState = {
  operator_code: '',
  branch_code: '',
  facility_code: '',
};

export default {
  branchInfo: createReducer<BranchInfoState>(branchInfoState, builder => {
    builder.addCase(branchSelected, (draft, { payload }) => {
      draft.operator_code = payload.operator_code;
      draft.branch_code = payload.branch_code;
      draft.facility_code = payload.facility_code;
    });
  }),
};
