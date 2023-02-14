import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import {
  ElectricAreaResult,
  ElectricPowerResult,
  ElectricYesterdayResult,
  FuelInfolResult,
  FuelInfoPayload,
  WaterAreaResult,
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

export const getElectricAreaAction = createAction(ActionTypes.DASHBOARD_GET_ELECTRIC_AREA);

export const getElectricAreaFinishAction = createAction(
  ActionTypes.DASHBOARD_GET_ELECTRIC_AREA_FINISH,
  (payload: ElectricAreaResult) => actionPayload(payload),
);

export const getWaterAreaAction = createAction(ActionTypes.DASHBOARD_GET_WATER_AREA);

export const getWaterAreaFinishAction = createAction(
  ActionTypes.DASHBOARD_GET_WATER_AREA_FINISH,
  (payload: WaterAreaResult) => actionPayload(payload),
);

export const getElectricPowerAction = createAction(ActionTypes.DASHBOARD_GET_ELECTRIC_POWER);

export const getElectricPowerFinishAction = createAction(
  ActionTypes.DASHBOARD_GET_ELECTRIC_POWER_FINISH,
  (payload: ElectricPowerResult) => actionPayload(payload),
);
