import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, delay, put, takeLatest } from 'redux-saga/effects';

import { AuthPath } from 'config';
import { ActionTypes } from 'literals';

import { getLogginedUserInfo, login, loginSuccess, logOutSuccess, showAlert } from 'actions';

export function* loginSaga({ payload }: ReturnType<typeof login>) {
  try {
    let accessToken = '';

    ({ access_token: accessToken } = yield call(request, apiEndPoint(AuthPath.LOGIN_PATH), {
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
  try {
    let username = '';
    let permission = [];
    let facilityId = '';
    let branchId = '';
    let canSwitchBranch = false;

    ({
      branch_id: branchId,
      can_switch_branch: canSwitchBranch,
      facility_id: facilityId,
      permission,
      username,
    } = yield call(request, apiEndPoint(AuthPath.PROFILE_PATH), {
      method: 'POST',
      headers: headerWithAuthorization(),
    }));

    yield put(
      loginSuccess({
        branch_id: branchId,
        can_switch_branch: canSwitchBranch,
        username,
        permission,
        facility_id: facilityId,
      }),
    );
  } catch (error) {
    console.log('Error', error);
    message.error('Something went wrong!');
  }
}

export function* logoutSaga() {
  yield delay(200);

  window.localStorage.removeItem('facility_id');
  window.localStorage.removeItem('branch_id');
  window.localStorage.removeItem('persist:rrsb');

  yield put(logOutSuccess());
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.USER_LOGIN_REQUEST, loginSaga),
    takeLatest(ActionTypes.USER_GET_LOGGINED_USER_INFO, getLogginedUserInfoSaga),
    takeLatest(ActionTypes.USER_LOGOUT_REQUEST, logoutSaga),
  ]);
}
