import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { FetchChannel, FetchChannelResult } from 'types';

export const fetchChannelsAction = createAction(
  ActionTypes.CHANNEL_FETCH,
  (payload: FetchChannel) => actionPayload(payload),
);

export const fetchChannelsSuccessAction = createAction(
  ActionTypes.CHANNEL_FETCH_SUCCESS,
  (payload: FetchChannelResult) => actionPayload(payload),
);
