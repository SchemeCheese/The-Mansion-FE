import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import {
  ElectricYesterdayResult,
  FuelInfolResult,
  FuelInfoPayload,
  WaterYesterdayResult,
} from 'types';

export const fetchFuelInfoAction = createAction(
  ActionTypes.DASHBOARD_GET_FUEL_INFO,
  (payload: FuelInfoPayload) => actionPayload(payload),
);

export const fetchFuelInfoFinishAction = createAction(
  ActionTypes.DASHBOARD_GET_FUEL_INFO_FINISH,
  (payload: FuelInfolResult) => actionPayload(payload),
);

export const getElectricYesterdayAction = createAction(
  ActionTypes.DASHBOARD_GET_ELECTRIC_YESTERDAY,
);

export const getElectricYesterdayFinishAction = createAction(
  ActionTypes.DASHBOARD_GET_ELECTRIC_YESTERDAY_FINISH,
  (payload: ElectricYesterdayResult) => actionPayload(payload),
);

export const getWaterYesterdayAction = createAction(ActionTypes.DASHBOARD_GET_WATER_YESTERDAY);

export const getWaterYesterdayFinishAction = createAction(
  ActionTypes.DASHBOARD_GET_WATER_YESTERDAY_FINISH,
  (payload: WaterYesterdayResult) => actionPayload(payload),
);
