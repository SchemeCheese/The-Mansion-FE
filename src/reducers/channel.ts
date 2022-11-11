import { createReducer } from '@reduxjs/toolkit';

import { fetchChannelsAction, fetchChannelsSuccessAction } from 'actions';

import { FetchChannelState } from 'types';

export const channelState = {
  channels: [],
  dates: [],
  websites: [],
  rates: [],
  is_searching: false,
  fromDate: '',
};

export default {
  channel: createReducer<FetchChannelState>(channelState, builder => {
    builder
      .addCase(fetchChannelsAction, (draft, { payload }) => {
        draft.is_searching = true;
        draft.fromDate = payload.fromDate;
      })
      .addCase(fetchChannelsSuccessAction, (draft, { payload }) => {
        draft.channels = payload.channels;
        draft.dates = payload.dates;
        draft.websites = payload.websites;
        draft.rates = payload.rates;
        draft.is_searching = false;
      });
  }),
};
