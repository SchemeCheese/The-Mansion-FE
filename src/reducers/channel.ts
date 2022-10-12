import { createReducer } from '@reduxjs/toolkit';

import { fetchChannelsAction, fetchChannelsSuccessAction } from 'actions';

import { FetchChannelState } from 'types';

export const channelState = {
  channels: [],
  dates: [],
  is_searching: false,
  rate_type: '',
  start_date: '',
};

export default {
  channel: createReducer<FetchChannelState>(channelState, builder => {
    builder
      .addCase(fetchChannelsAction, (draft, { payload }) => {
        draft.is_searching = true;
        draft.start_date = payload.start_date;
        draft.rate_type = payload.rate_type;
      })
      .addCase(fetchChannelsSuccessAction, (draft, { payload }) => {
        draft.channels = payload.channels;
        draft.dates = payload.dates;
        draft.is_searching = false;
      });
  }),
};
