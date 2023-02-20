import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { BranchManagerResult } from 'types';

export const branchManager = createAction(ActionTypes.BRANCH_MANAGER_GET);

export const branchManagerFinish = createAction(
  ActionTypes.BRANCH_MANAGER_GET_FINISH,
  (payload: BranchManagerResult) => actionPayload(payload),
);
