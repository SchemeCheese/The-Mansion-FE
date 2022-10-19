import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { GuestCreate } from 'types';

export const createGuest = createAction(ActionTypes.GUEST_CREATE, (payload: GuestCreate) =>
  actionPayload(payload),
);

export const createGuestSuccess = createAction(ActionTypes.GUEST_CREATE_SUCCESS);
