import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import {
  BranchSelected,
  BranchsResult,
  GetBranchFacilityFinishPayload,
  GetBranchFacilityPayload,
  GetFacilityPayload,
  GetFacilityPayloadFinishResult,
} from 'types';

export const branchs = createAction(ActionTypes.GET_BRANCH);

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

export const getFacilityAction = createAction(
  ActionTypes.GET_FACILITY,
  (payload: GetFacilityPayload) => actionPayload(payload),
);

export const getFacilityFinishAction = createAction(
  ActionTypes.GET_FACILITY_FINISH,
  (payload: GetFacilityPayloadFinishResult) => actionPayload(payload),
);
