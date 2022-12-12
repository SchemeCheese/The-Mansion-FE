import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import {
  BranchSelected,
  BranchsResult,
  GetBranchFacilityFinishPayload,
  GetBranchFacilityPayload,
} from 'types';

export const branchs = createAction(ActionTypes.GET_BRANCH, (payload: any) =>
  actionPayload(payload),
);

export const branchsFinish = createAction(ActionTypes.GET_BRANCH_FINISH, (payload: BranchsResult) =>
  actionPayload(payload),
);

export const branchFacilites = createAction(
  ActionTypes.GET_BRANCH_FACILITY,
  (payload: GetBranchFacilityPayload) => actionPayload(payload),
);

export const branchFacilitesFinish = createAction(
  ActionTypes.GET_BRANCH_FACILITY_FINISH,
  (payload: GetBranchFacilityFinishPayload) => actionPayload(payload),
);

export const branchSelected = createAction(ActionTypes.BRANCH_SELECTED, (payload: BranchSelected) =>
  actionPayload(payload),
);
