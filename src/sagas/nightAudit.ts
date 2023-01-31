import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { NightAuditEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  handleNightAuditAction,
  handleNightAuditFinishAction,
  handleNoShowReservationDetailAction,
  handleNoShowReservationDetailFinishAction,
  logOut,
} from 'actions';

export function* postHandleNoShowSaga({
  payload,
}: ReturnType<typeof handleNoShowReservationDetailAction>) {
  try {
    yield call(
      request,
      `${apiEndPoint(NightAuditEndpoint.HANDLE_NOSHOW)}/${payload.reservation_detail_id}`,
      {
        method: 'POST',
        headers: headerWithAuthorization(),
      },
    );

    yield put(handleNoShowReservationDetailFinishAction());
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Cannot process no show!');
    }
  }
}

export function* postHandleNightAuditSaga({ payload }: ReturnType<typeof handleNightAuditAction>) {
  try {
    yield call(
      request,
      `${apiEndPoint(NightAuditEndpoint.HANDLE_NIGHT_AUDIT)}/${payload.facility_id}`,
      {
        method: 'GET',
        headers: headerWithAuthorization(),
      },
    );

    yield put(handleNightAuditFinishAction());
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Cannot process night audit!');
    }
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.NIGHT_AUDIT_NO_SHOW, postHandleNoShowSaga)]);
  yield all([takeLatest(ActionTypes.NIGHT_AUDIT_HANDLE, postHandleNightAuditSaga)]);
}
