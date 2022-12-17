import { createReducer } from '@reduxjs/toolkit';

import { getNotifcationsAction, getNotifcationsActionFinish } from 'actions';

import { NotificationsState } from 'types';

export const notificationsState = {
  is_finish: false,
  data: [],
};

export default {
  notifications: createReducer<NotificationsState>(notificationsState, builder => {
    builder
      .addCase(getNotifcationsAction, draft => {
        draft.is_finish = false;
      })
      .addCase(getNotifcationsActionFinish, (draft, { payload }) => {
        draft.data = payload.data;
        draft.is_finish = true;
      });
  }),
};
