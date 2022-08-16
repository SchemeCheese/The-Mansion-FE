import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { LoginCredentials, LoginSuccess } from 'types';

export const login = createAction(ActionTypes.USER_LOGIN_REQUEST, (payload: LoginCredentials) =>
  actionPayload(payload),
);
export const loginSuccess = createAction(ActionTypes.USER_LOGIN_SUCCESS, (payload: LoginSuccess) =>
  actionPayload(payload),
);
export const getLogginedUserInfo = createAction(ActionTypes.USER_GET_LOGGINED_USER_INFO);

export const logOut = createAction(ActionTypes.USER_LOGOUT_REQUEST);
export const logOutSuccess = createAction(ActionTypes.USER_LOGOUT_SUCCESS);
