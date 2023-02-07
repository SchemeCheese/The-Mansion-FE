import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { iotApiEndPoint } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { IOTEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { getElectricYesterdayFinishAction, getWaterYesterdayFinishAction, logOut } from 'actions';

export function* getElectricYesterdaySaga() {
  try {
    let data = [];

    data = yield call(request, `${iotApiEndPoint(IOTEndpoint.dashboard.fuel.electric)}/yesterday`, {
      method: 'GET',
    });

    yield put(
      getElectricYesterdayFinishAction({
        totalMonth: data.totalMonth,
        dayPass: data.dayPass,
        totalYesterday: data.totalYesterday,
        avgYesterday: data.avgYesterday,
        listData: data.listData,
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

export function* getWaterYesterdaySaga() {
  try {
    let data = [];

    data = yield call(request, `${iotApiEndPoint(IOTEndpoint.dashboard.fuel.water)}/yesterday`, {
      method: 'GET',
    });

    yield put(
      getWaterYesterdayFinishAction({
        totalMonth: data.totalMonth,
        dayPass: data.dayPass,
        totalYesterday: data.totalYesterday,
        avgYesterday: data.avgYesterday,
        listData: data.listData,
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
  yield all([takeLatest(ActionTypes.DASHBOARD_GET_ELECTRIC_YESTERDAY, getElectricYesterdaySaga)]);
  yield all([takeLatest(ActionTypes.DASHBOARD_GET_WATER_YESTERDAY, getWaterYesterdaySaga)]);
}
