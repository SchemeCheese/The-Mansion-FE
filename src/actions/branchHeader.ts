import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { BranchHeaderResult } from 'types';

export const branchHeader = createAction(ActionTypes.BRANCH_HEADER_GET, (payload: any) =>
  actionPayload(payload),
);

export const branchHeaderFinish = createAction(
  ActionTypes.BRANCH_HEADER_GET_FINISH,
  (payload: BranchHeaderResult) => actionPayload(payload),
);
