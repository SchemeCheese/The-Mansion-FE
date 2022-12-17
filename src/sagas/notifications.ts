import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { NotificationEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { logOut } from 'actions';
import {
  getNotifcationsAction,
  getNotifcationsActionFinish,
  readNotifcationsAction,
  readNotifcationsActionFinish,
} from 'actions/notification';

export function* getNotificationsSaga() {
  try {
    let data = [];

    ({ data } = yield call(request, `${apiEndPoint(NotificationEndpoint.GET_NOTIFICATION)}`, {
      method: 'GET',
      headers: headerWithAuthorization(),
    }));

    yield put(getNotifcationsActionFinish({ data }));
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Can not get notification info!');
    }
  }
}

export function* postReadNotificationsSaga({ payload }: ReturnType<typeof readNotifcationsAction>) {
  try {
    let data = [];

    ({ data } = yield call(
      request,
      `${apiEndPoint(NotificationEndpoint.READ_NOTIFICATION)}/${payload.id}`,
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
      message.error('Can not read notification!');
    }
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.GET_NOTIFICATION, getNotificationsSaga)]);
  yield all([takeLatest(ActionTypes.READ_NOTIFICATION, postReadNotificationsSaga)]);
}
