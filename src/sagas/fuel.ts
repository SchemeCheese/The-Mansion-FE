import { request } from '@gilbarbara/helpers';

import { iotApiEndPoint } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { IOTEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { fetchFuelInfoAction, fetchFuelInfoFinishAction, logOut } from 'actions';
import { notify } from 'ui/notification';

export function* fetchFuelSaga({ payload }: ReturnType<typeof fetchFuelInfoAction>) {
  try {
    let waterData = [];
    let electricData = [];

    ({ data: waterData } = yield call(
      request,
      `${iotApiEndPoint(IOTEndpoint.dashboard.fuel.water)}/${payload.type}`,
      {
        method: 'GET',
      },
    ));

    ({ data: electricData } = yield call(
      request,
      `${iotApiEndPoint(IOTEndpoint.dashboard.fuel.electric)}/${payload.type}`,
      {
        method: 'GET',
      },
    ));

    yield put(
      fetchFuelInfoFinishAction({
        water: waterData,
        electric: electricData,
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

export default function* root() {
  yield all([takeLatest(ActionTypes.DASHBOARD_GET_FUEL_INFO, fetchFuelSaga)]);
}
