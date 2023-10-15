import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { ReservationEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { checkinAction, checkinSuccessAction } from 'actions';

export function* postCheckinSaga({ payload }: ReturnType<typeof checkinAction>) {
  const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

  try {
    yield call(
      request,
      `${apiEndPoint(ReservationEndpoint.CHECKIN)}/${payload.payload.reservation_id}/checkin`,
      {
        method: 'POST',
        headers: headerWithAuthorization(),
        body: {
          ...payload.payload,
          operator_code,
          branch_code,
          facility_code,
        },
      },
    );

    yield put(checkinSuccessAction());
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error cannot checkin', error);
    }

    message.error('Cannot checkin!');
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.CHECKIN, postCheckinSaga)]);
}
