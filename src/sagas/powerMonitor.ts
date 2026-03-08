import { request } from '@gilbarbara/helpers';

import { iotApiEndPoint } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { IOTEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  downloadCSVBranchManagerAction,
  downloadCSVBranchManagerFinishAction,
  getDeviceManagerFinishAction,
  logOut,
} from 'actions';
import { notify } from 'ui/notification';

export function* getDeviceManagerSaga(): any {
  try {
    let data: any = [];

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
      notify.error('Can not fetch channel info!');
    }
  }
}

export function* getDownloadCSVBranchManagerSaga({
  payload,
}: ReturnType<typeof downloadCSVBranchManagerAction>): any {
  try {
    const urlApi = `${iotApiEndPoint(IOTEndpoint.powerMonitor.branchDownLoadCsv)}`;

    fetch(urlApi, {
      method: 'GET',
    }).then(response => {
      response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = payload.payload.file_name;
        a.click();
      });
    });

    yield put(downloadCSVBranchManagerFinishAction());
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      notify.error('Cannot download file!');
    }
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.POWER_MONITOR_GET_DEVICE_MANAGER, getDeviceManagerSaga)]);
  yield all([takeLatest(ActionTypes.BRANCH_MANAGER_DOWNLOAD_CSV, getDownloadCSVBranchManagerSaga)]);
}
