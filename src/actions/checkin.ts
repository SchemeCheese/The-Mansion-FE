import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { CheckinRequest } from 'types';

export const checkinAction = createAction(ActionTypes.CHECKIN, (payload: CheckinRequest) =>
  actionPayload(payload),
);

export const checkinSuccessAction = createAction(ActionTypes.CHECKIN_SUCCESS);
