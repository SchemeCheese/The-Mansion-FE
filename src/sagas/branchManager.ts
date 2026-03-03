import { request } from '@gilbarbara/helpers';
import { iotApiEndPoint } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GetAllBranchManagerEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { branchManagerFinish } from 'actions';

export function* getBranchManagerSaga(): any {
  try {
    let data: any = [];

    data = yield call(request, `${iotApiEndPoint(GetAllBranchManagerEndpoint.GET)}`, {
      method: 'GET',
    });
    yield put(
      branchManagerFinish({
        DataElectric: data.data.electricity,
        DataWater: data.data.water,
        status: 'SUCCESS',
      }),
    );
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error branch manager', error);
    }
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.BRANCH_MANAGER_GET, getBranchManagerSaga)]);
}
