import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import {
  GetReservationCheckin,
  GetReservationCheckinResult,
  GetReservationCheckoutFromRoomNo,
  GetReservationCheckoutFromRoomNoResult,
  GuestCreate,
  GuestRemove,
  GuestUpdate,
  SetMainGuest,
} from 'types';

export const createGuest = createAction(ActionTypes.GUEST_CREATE, (payload: GuestCreate) =>
  actionPayload(payload),
);

export const createGuestSuccess = createAction(ActionTypes.GUEST_CREATE_SUCCESS);

export const updateGuestAction = createAction(ActionTypes.GUEST_UPDATE, (payload: GuestUpdate) =>
  actionPayload(payload),
);

export const updateGuestSuccessAction = createAction(ActionTypes.GUEST_UPDATE_SUCCESS);

export const removeGuestAction = createAction(ActionTypes.GUEST_REMOVE, (payload: GuestRemove) =>
  actionPayload(payload),
);

export const removeGuestSuccessAction = createAction(ActionTypes.GUEST_REMOVE_SUCCESS);

export const setMainGuestAction = createAction(
  ActionTypes.SET_MAIN_GUEST,
  (payload: SetMainGuest) => actionPayload(payload),
);

export const setMainGuestSuccessAction = createAction(ActionTypes.SET_MAIN_GUEST_SUCCESS);

export const getReservationCheckoutByRoomNoAction = createAction(
  ActionTypes.GET_RESERVATION_DETAIL_BY_ROOM_NO,
  (payload: GetReservationCheckoutFromRoomNo) => actionPayload(payload),
);

export const getReservationCheckoutByRoomNoActionSuccess = createAction(
  ActionTypes.GET_RESERVATION_DETAIL_BY_ROOM_NO_SUCCESS,
  (payload: GetReservationCheckoutFromRoomNoResult) => actionPayload(payload),
);

export const resetReservationCheckoutByRoomNoAction = createAction(
  ActionTypes.RESET_RESERVATION_DETAIL_BY_ROOM_NO_SUCCESS,
);

export const getReservationGuestCheckinAction = createAction(
  ActionTypes.GET_RESERVATION_CHECKIN,
  (payload: GetReservationCheckin) => actionPayload(payload),
);

export const getReservationGuestCheckinSuccessAction = createAction(
  ActionTypes.GET_RESERVATION_CHECKIN_SUCCESS,
  (payload: GetReservationCheckinResult) => actionPayload(payload),
);

export const resetReservationGuestCheckinAction = createAction(
  ActionTypes.RESET_RESERVATION_CHECKIN,
);
