import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import {
  AvailableScheduleResult,
  AvailableScheduleSearch,
  ScheduleSearch,
  ScheduleSearchResult,
} from 'types';

export const searchScheduleAction = createAction(
  ActionTypes.RESERVATION_FETCH_SCHEDULE,
  (payload: ScheduleSearch) => actionPayload(payload),
);

export const searchScheduleActionSuccess = createAction(
  ActionTypes.RESERVATION_FETCH_SCHEDULE_SUCCESS,
  (payload: ScheduleSearchResult) => actionPayload(payload),
);

export const searchAvailableScheduleAction = createAction(
  ActionTypes.RESERVATION_FETCH_AVAILABLE_SCHEDULE,
  (payload: AvailableScheduleSearch) => actionPayload(payload),
);

export const searchAvailableScheduleActionSuccess = createAction(
  ActionTypes.RESERVATION_FETCH_AVAILABLE_SCHEDULE_SUCCESS,
  (payload: AvailableScheduleResult) => actionPayload(payload),
);
