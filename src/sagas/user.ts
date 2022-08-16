import { request } from '@gilbarbara/helpers';
import { all, call, delay, put, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from 'literals';

import { getLogginedUserInfo, login, loginSuccess, logOutSuccess, showAlert } from 'actions';

export function* loginSaga({ payload }: ReturnType<typeof login>) {
  try {
    yield delay(400);

    let accessToken = '';

    ({ access_token: accessToken } = yield call(request, `http://localhost:8096/auth/login`, {
      method: 'POST',
      body: payload,
    }));
    localStorage.setItem('access_token', accessToken);

    yield put(getLogginedUserInfo());
  } catch {
    yield put(
      showAlert(`Login failed, please check your credentials`, {
        variant: 'danger',
        icon: 'sign-in',
        timeout: 10,
      }),
    );
  }
}

export function* getLogginedUserInfoSaga() {
  let email = '';
  let name = '';
  const accessToken = localStorage.getItem('access_token');

  ({ email, name } = yield call(request, `http://localhost:8096/auth/me`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }));

  console.log('accessToken', accessToken, email, name);

  yield put(
    loginSuccess({
      email,
      name,
    }),
  );
}

export function* logoutSaga() {
  yield delay(200);

  yield put(logOutSuccess());
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.USER_LOGIN_REQUEST, loginSaga),
    takeLatest(ActionTypes.USER_GET_LOGGINED_USER_INFO, getLogginedUserInfoSaga),
    takeLatest(ActionTypes.USER_LOGOUT_REQUEST, logoutSaga),
  ]);
}
