import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { FuelInfolResult, FuelInfoPayload } from 'types';

export const fetchFuelInfoAction = createAction(
  ActionTypes.DASHBOARD_GET_FUEL_INFO,
  (payload: FuelInfoPayload) => actionPayload(payload),
);

export const fetchFuelInfoFinishAction = createAction(
  ActionTypes.DASHBOARD_GET_FUEL_INFO_FINISH,
  (payload: FuelInfolResult) => actionPayload(payload),
);
