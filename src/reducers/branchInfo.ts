import { createReducer } from '@reduxjs/toolkit';

import { branchSelected } from 'actions';

import { BranchInfoState } from 'types';

export const branchInfoState = {
  addition_cico_fee: '',
  operator_code: '',
  branch_code: '',
  facility_code: '',
  normal_time_check_in: '',
  normal_time_check_out: '',
};

export default {
  branchInfo: createReducer<BranchInfoState>(branchInfoState, builder => {
    builder.addCase(branchSelected, (draft, { payload }) => {
      draft.operator_code = payload.operator_code;
      draft.branch_code = payload.branch_code;
      draft.facility_code = payload.facility_code;
      draft.normal_time_check_in = payload.normal_time_check_in;
      draft.normal_time_check_out = payload.normal_time_check_out;
      draft.addition_cico_fee = payload.addition_cico_fee;
    });
  }),
};
