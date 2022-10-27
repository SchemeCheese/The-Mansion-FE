import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { GuestCreate, GuestRemove, GuestUpdate } from 'types';

export const createGuest = createAction(ActionTypes.GUEST_CREATE, (payload: GuestCreate) =>
  actionPayload(payload),
);

export const createGuestSuccess = createAction(ActionTypes.GUEST_CREATE_SUCCESS);

export const updateGuestAction = createAction(ActionTypes.GUEST_UPDATE, (payload: GuestUpdate) =>
  actionPayload(payload),
);

export const updateGuestSuccessAction = createAction(ActionTypes.GUEST_UPDATE_SUCCESS);

export const removeGuestAction = createAction(ActionTypes.GUEST_REMOVE, (payload: GuestRemove) =>
  actionPayload(payload),
);

export const removeGuestSuccessAction = createAction(ActionTypes.GUEST_REMOVE_SUCCESS);
