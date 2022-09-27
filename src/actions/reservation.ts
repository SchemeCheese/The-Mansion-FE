import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import {
  GetReservationFinishPayload,
  GetReservationPayload,
  ReservationCreate,
  ReservationDetail,
  ReservationDetailFinish,
  ReservationNumberGetPayload,
  ReservationNumberResult,
  ReservationSearch,
  ReservationSearchResult,
} from 'types';

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

export const updateReservation = createAction(
  ActionTypes.RESERVATION_UPDATE,
  (payload: ReservationCreate) => actionPayload(payload),
);

export const updateReservationSuccess = createAction(ActionTypes.RESERVATION_UPDATE_SUCCESS);

export const getReservationNumber = createAction(
  ActionTypes.RESERVATION_NUMBER_GET,
  (payload: ReservationNumberGetPayload) => actionPayload(payload),
);

export const getReservationNumberFinish = createAction(
  ActionTypes.RESERVATION_NUMBER_GET_FINISH,
  (payload: ReservationNumberResult) => actionPayload(payload),
);

export const getReservationDetail = createAction(
  ActionTypes.RESERVATION_GET_DETAIL,
  (payload: ReservationDetail) => actionPayload(payload),
);

export const getReservationDetailFinish = createAction(
  ActionTypes.RESERVATION_GET_DETAIL_FINISH,
  (payload: ReservationDetailFinish) => actionPayload(payload),
);

export const getReservation = createAction(
  ActionTypes.RESERVATION_GET,
  (payload: GetReservationPayload) => actionPayload(payload),
);

export const getReservationFinish = createAction(
  ActionTypes.RESERVATION_GET_FINISH,
  (payload: GetReservationFinishPayload) => actionPayload(payload),
);
