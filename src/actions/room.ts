import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import {
  GetRoomResult,
  ReservationRoomFilter,
  ReservationRoomResult,
  RoomSearch,
  RoomSearchResult,
  RoomTypeResult,
  SearchWalkinRoomFilter,
} from 'types';

export const searchRoom = createAction(ActionTypes.ROOM_SEARCH, (payload: RoomSearch) =>
  actionPayload(payload),
);

export const searchRoomFinish = createAction(
  ActionTypes.ROOM_SEARCH_FINISH,
  (payload: RoomSearchResult) => actionPayload(payload),
);

export const getRoomType = createAction(ActionTypes.ROOM_TYPE_GET);

export const getRoomTypeFinish = createAction(
  ActionTypes.ROOM_TYPE_GET_FINISH,
  (payload: RoomTypeResult) => actionPayload(payload),
);

export const searchRoomReset = createAction(ActionTypes.ROOM_SEARCH_RESET);

export const getRoomsAction = createAction(ActionTypes.GET_ROOMS);
export const getRoomsActionFinish = createAction(
  ActionTypes.GET_ROOMS_FINISH,
  (payload: GetRoomResult) => actionPayload(payload),
);

export const getWalkinRoomsAction = createAction(
  ActionTypes.GET_WALKIN_ROOMS,
  (payload: SearchWalkinRoomFilter) => actionPayload(payload),
);

export const getWalkinRoomsActionFinish = createAction(
  ActionTypes.GET_WALKIN_ROOMS_FINISH,
  (payload: GetRoomResult) => actionPayload(payload),
);

export const getReservationRoomInhouseAction = createAction(
  ActionTypes.GET_RESERVATION_ROOM_INHOUSE,
  (payload: ReservationRoomFilter) => actionPayload(payload),
);

export const getReservationRoomInhouseActionFinish = createAction(
  ActionTypes.GET_RESERVATION_ROOM_INHOUSE_FINISH,
  (payload: ReservationRoomResult) => actionPayload(payload),
);

export const getReservationRoomCheckoutTodayAction = createAction(
  ActionTypes.GET_RESERVATION_ROOM_CHECKOUT_TODAY,
  (payload: ReservationRoomFilter) => actionPayload(payload),
);

export const getReservationRoomCheckoutTodayActionFinish = createAction(
  ActionTypes.GET_RESERVATION_ROOM_CHECKOUT_TODAY_FINISH,
  (payload: ReservationRoomResult) => actionPayload(payload),
);

export const getReservationRoomCheckinTodayAction = createAction(
  ActionTypes.GET_RESERVATION_ROOM_CHECKIN_TODAY,
  (payload: ReservationRoomFilter) => actionPayload(payload),
);

export const getReservationRoomCheckinTodayActionFinish = createAction(
  ActionTypes.GET_RESERVATION_ROOM_CHECKIN_TODAY_FINISH,
  (payload: ReservationRoomResult) => actionPayload(payload),
);
