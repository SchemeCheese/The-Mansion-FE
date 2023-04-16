import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { HouseKeepingResult, HouseKeepingSearch, HouseKeepingUpdate } from 'types';

export const getHouseKeepingAction = createAction(
  ActionTypes.HOUSE_KEEPING_GET,
  (payload: HouseKeepingSearch) => actionPayload(payload),
);

export const getHouseKeepingFinishAction = createAction(
  ActionTypes.HOUSE_KEEPING_GET_FINISH,
  (payload: HouseKeepingResult) => actionPayload(payload),
);

export const updateHouseKeepingAction = createAction(
  ActionTypes.UPDATE_HOUSE_KEEPING,
  (payload: HouseKeepingUpdate) => actionPayload(payload),
);

export const updateHouseKeepingSuccessAction = createAction(
  ActionTypes.UPDATE_HOUSE_KEEPING_SUCCESS,
);
