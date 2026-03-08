import { request } from '@gilbarbara/helpers';

import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { NotificationEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { logOut } from 'actions';
import {
  getNotifcationsAction,
  getNotifcationsActionFinish,
  readNotifcationsAction,
  readNotifcationsActionFinish,
} from 'actions/notification';
import { notify } from 'ui/notification';

export function* getNotificationsSaga() {
  try {
    let data = [];

    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});
    const query = new URLSearchParams(
      Object({ branch_code, facility_code, operator_code }),
    ).toString();

    ({ data } = yield call(
      request,
      `${apiEndPoint(NotificationEndpoint.GET_NOTIFICATION)}?${query}`,
      {
        method: 'GET',
        headers: headerWithAuthorization(),
      },
    ));

    yield put(getNotifcationsActionFinish({ data }));
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      notify.error('Can not get notification info!');
    }
  }
}

export function* postReadNotificationsSaga({ payload }: ReturnType<typeof readNotifcationsAction>) {
  try {
    let data = [];
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});
    const payloadBranch = {
      operator_code,
      branch_code,
      facility_code,
    };
    const query = new URLSearchParams(Object(payloadBranch)).toString();

    ({ data } = yield call(
      request,
      `${apiEndPoint(NotificationEndpoint.READ_NOTIFICATION)}/${payload.id}?${query}`,
      {
        method: 'POST',
        headers: headerWithAuthorization(),
      },
    ));

    yield put(readNotifcationsActionFinish());
    yield put(getNotifcationsAction());
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      notify.error('Can not read notification!');
    }
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.GET_NOTIFICATION, getNotificationsSaga)]);
  yield all([takeLatest(ActionTypes.READ_NOTIFICATION, postReadNotificationsSaga)]);
}
