import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { iotApiEndPoint } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { IOTEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { getDeviceManagerFinishAction, logOut } from 'actions';

export function* getDeviceManagerSaga() {
  try {
    let data = [];

    data = yield call(request, `${iotApiEndPoint(IOTEndpoint.powerMonitor.device)}`, {
      method: 'GET',
    });

    yield put(
      getDeviceManagerFinishAction({
        data: data.data,
      }),
    );
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Can not fetch channel info!');
    }
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.POWER_MONITOR_GET_DEVICE_MANAGER, getDeviceManagerSaga)]);
}
