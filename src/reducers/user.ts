import { createReducer } from '@reduxjs/toolkit';

import { STATUS } from 'literals';

import { getLogginedUserInfo, login, loginSuccess, logOut, logOutSuccess } from 'actions';

import { UserState } from 'types';

export const userState = {
  isAuthenticated: false,
  status: STATUS.IDLE,
  username: '',
  name: '',
  permission: [],
};

export default {
  user: createReducer<UserState>(userState, builder => {
    builder
      .addCase(login, draft => {
        draft.status = STATUS.RUNNING;
      })
      .addCase(loginSuccess, (draft, { payload }) => {
        draft.isAuthenticated = true;
        draft.status = STATUS.READY;
        draft.username = payload.username;
        draft.permission = payload.permission;
      })
      .addCase(getLogginedUserInfo, draft => {
        draft.isAuthenticated = false;
        draft.status = STATUS.READY;
      });

    builder
      .addCase(logOut, draft => {
        draft.status = STATUS.RUNNING;
      })
      .addCase(logOutSuccess, draft => {
        localStorage.removeItem('access_token');

        draft.isAuthenticated = false;
        draft.status = STATUS.IDLE;
      });
  }),
};
