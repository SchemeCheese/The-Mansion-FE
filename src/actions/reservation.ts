import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import {
  BookRoom,
  GetReservationFinishPayload,
  GetReservationPayload,
  ReservationCreate,
  ReservationDetail,
  ReservationDetailFinish,
  ReservationNumberGetPayload,
  ReservationNumberResult,
  ReservationSearch,
  ReservationSearchResult,
  UpdateRate,
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

export const updateRate = createAction(ActionTypes.RESERVATION_RATE_UPDATE, (payload: UpdateRate) =>
  actionPayload(payload),
);

export const updateRateSuccess = createAction(ActionTypes.RESERVATION_RATE_UPDATE_SUCCESS);

export const bookRoom = createAction(ActionTypes.RESERVATION_BOOK_ROOM, (payload: BookRoom) =>
  actionPayload(payload),
);

export const bookRoomSuccess = createAction(ActionTypes.RESERVATION_BOOK_ROOM_SUCCESS);

export const resetReservation = createAction(ActionTypes.RESERVATION_RESET);

export const resetReservationDetail = createAction(ActionTypes.RESERVATION_GET_DETAIL_RESET);
