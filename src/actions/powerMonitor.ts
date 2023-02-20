import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { DeviceManagerResult } from 'types';

export const getDeviceManagerAction = createAction(ActionTypes.POWER_MONITOR_GET_DEVICE_MANAGER);

export const getDeviceManagerFinishAction = createAction(
  ActionTypes.POWER_MONITOR_GET_DEVICE_MANAGER_FINISH,
  (payload: DeviceManagerResult) => actionPayload(payload),
);
