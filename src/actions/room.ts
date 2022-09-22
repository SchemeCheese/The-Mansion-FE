import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { RoomSearch, RoomSearchResult, RoomTypeResult } from 'types';

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
