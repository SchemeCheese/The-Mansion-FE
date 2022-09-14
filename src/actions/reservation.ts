import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { ReservationCreate, ReservationSearch, ReservationSearchResult } from 'types';

export const searchReservation = createAction(
  ActionTypes.RESERVATION_SEARCH,
  (payload: ReservationSearch) => actionPayload(payload),
);

export const searchReservationFinish = createAction(
  ActionTypes.RESERVATION_SEARCH_FINISH,
  (payload: ReservationSearchResult) => actionPayload(payload),
);

export const createReservation = createAction(
  ActionTypes.RESERVATION_CREATE,
  (payload: ReservationCreate) => actionPayload(payload),
);

export const createReservationSuccess = createAction(ActionTypes.RESERVATION_CREATE_SUCCESS);
