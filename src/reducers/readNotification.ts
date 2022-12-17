import { createReducer } from '@reduxjs/toolkit';

import { getNotifcationsActionFinish, readNotifcationsAction } from 'actions';

import { ReadNotificationState } from 'types';

export const readNotificationState = {
  is_finish: false,
  id: '',
};

export default {
  readNotification: createReducer<ReadNotificationState>(readNotificationState, builder => {
    builder
      .addCase(readNotifcationsAction, (draft, { payload }) => {
        draft.is_finish = false;
        draft.id = payload.id;
      })
      .addCase(getNotifcationsActionFinish, draft => {
        draft.is_finish = true;
      });
  }),
};
