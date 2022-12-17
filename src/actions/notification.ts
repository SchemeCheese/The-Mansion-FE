import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { NotificationGetResult, ReadNotification } from 'types/notifications';

export const getNotifcationsAction = createAction(ActionTypes.GET_NOTIFICATION);

export const getNotifcationsActionFinish = createAction(
  ActionTypes.GET_NOTIFICATION_FINISH,
  (payload: NotificationGetResult) => actionPayload(payload),
);

export const readNotifcationsAction = createAction(
  ActionTypes.READ_NOTIFICATION,
  (payload: ReadNotification) => actionPayload(payload),
);

export const readNotifcationsActionFinish = createAction(ActionTypes.READ_NOTIFICATION_FINISH);
