import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { FetchChannel, FetchChannelResult, UpdateRoomAvailable } from 'types';

export const fetchChannelsAction = createAction(
  ActionTypes.CHANNEL_FETCH,
  (payload: FetchChannel) => actionPayload(payload),
);

export const fetchChannelsSuccessAction = createAction(
  ActionTypes.CHANNEL_FETCH_SUCCESS,
  (payload: FetchChannelResult) => actionPayload(payload),
);

export const updateRoomAvailableAction = createAction(
  ActionTypes.UPDATE_ROOM_AVAILABLE_NUMBER,
  (payload: UpdateRoomAvailable) => actionPayload(payload),
);

export const updateRoomAvailableSuccessAction = createAction(
  ActionTypes.UPDATE_ROOM_AVAILABLE_NUMBER_SUCCESS,
);
