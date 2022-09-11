import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { ReservationSearch, ReservationSearchResult } from 'types';

export const searchReservation = createAction(
  ActionTypes.RESERVATION_SEARCH,
  (payload: ReservationSearch) => actionPayload(payload),
);

export const searchReservationFinish = createAction(
  ActionTypes.RESERVATION_SEARCH_FINISH,
  (payload: ReservationSearchResult) => actionPayload(payload),
);
