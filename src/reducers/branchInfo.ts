import { createReducer } from '@reduxjs/toolkit';

import { branchSelected } from 'actions';

import { BranchInfoState } from 'types';

export const branchInfoState = {
  id: '',
  name: '',
  abbreviation: '',
  business_date: '',
  can_night_audit: false,
  addition_cico_fee: 0,
  operator_code: '',
  branch_code: '',
  facility_code: '',
  normal_time_check_in: '',
  normal_time_check_out: '',
  channel_manager: false,
  warning_na_msg: '',
};

export default {
  branchInfo: createReducer<BranchInfoState>(branchInfoState, builder => {
    builder.addCase(branchSelected, (draft, { payload }) => {
      draft.id = payload.id;
      draft.name = payload.name;
      draft.abbreviation = payload.abbreviation;
      draft.operator_code = payload.operator_code;
      draft.branch_code = payload.branch_code;
      draft.facility_code = payload.facility_code;
      draft.normal_time_check_in = payload.normal_time_check_in;
      draft.normal_time_check_out = payload.normal_time_check_out;
      draft.addition_cico_fee = payload.addition_cico_fee;
      draft.channel_manager = payload.channel_manager;
      draft.warning_na_msg = payload.warning_na_msg;
      draft.business_date = payload.business_date;
      draft.can_night_audit = payload.can_night_audit;
    });
  }),
};
