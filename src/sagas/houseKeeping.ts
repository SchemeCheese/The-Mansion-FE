import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { GetHouseKeepingEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  getHouseKeepingAction,
  getHouseKeepingFinishAction,
  updateHouseKeepingAction,
  updateHouseKeepingSuccessAction,
} from 'actions';

export function* getHouseKeepingSaga({ payload }: ReturnType<typeof getHouseKeepingAction>) {
  try {
    let data = [];

    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

    const payloadWithHouseKeeping = {
      ...payload,
      branch_code,
      facility_code,
      operator_code,
    };
    const query = new URLSearchParams(Object(payloadWithHouseKeeping)).toString();

    data = yield call(request, `${apiEndPoint(GetHouseKeepingEndpoint.GET)}?${query}`, {
      method: 'GET',
      headers: headerWithAuthorization(),
    });

    yield put(getHouseKeepingFinishAction(data));
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error house keeping', error);
    }

    message.error('Error house keeping!');
  }
}

export function* postUpdateHouseKeepingSaga({
  payload,
}: ReturnType<typeof updateHouseKeepingAction>) {
  try {
    let success = '';
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});
    const payloadBranch = {
      operator_code,
      branch_code,
      facility_code,
    };

    ({ success } = yield call(
      request,
      `${apiEndPoint(GetHouseKeepingEndpoint.UPDATE)}/${payload.room_id}/update-state`,
      {
        method: 'POST',
        headers: headerWithAuthorization(),
        body: {
          ...payload,
          ...payloadBranch,
        },
      },
    ));

    if (success) {
      yield put(updateHouseKeepingSuccessAction());
      message.success('Update house keeping successfully!');
    } else {
      message.error('Update House Keeping Failed!');
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error Update House Keeping', error);
    }

    message.error('Update House Keeping Failed!');
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.HOUSE_KEEPING_GET, getHouseKeepingSaga)]);
  yield all([takeLatest(ActionTypes.UPDATE_HOUSE_KEEPING, postUpdateHouseKeepingSaga)]);
}
