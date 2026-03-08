import { request } from '@gilbarbara/helpers';

import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { NightAuditEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  handleNightAuditAction,
  handleNightAuditFinishAction,
  handleNoShowReservationDetailAction,
  handleNoShowReservationDetailFinishAction,
  logOut,
} from 'actions';
import { notify } from 'ui/notification';

export function* postHandleNightAuditSaga({ payload }: ReturnType<typeof handleNightAuditAction>) {
  try {
    yield call(
      request,
      `${apiEndPoint(NightAuditEndpoint.HANDLE_NIGHT_AUDIT)}/${payload.facility_id}`,
      {
        method: 'POST',
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
      notify.error('Cannot process night audit!');
    }
  }
}

export function* postHandleNoShowSaga({
  payload,
}: ReturnType<typeof handleNoShowReservationDetailAction>) {
  try {
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});
    const payloadBranch = {
      operator_code,
      branch_code,
      facility_code,
    };
    const query = new URLSearchParams(Object(payloadBranch)).toString();

    yield call(
      request,
      `${apiEndPoint(NightAuditEndpoint.HANDLE_NOSHOW)}/${payload.reservation_detail_id}?${query}`,
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
      notify.error('Cannot process no show!');
    }
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.NIGHT_AUDIT_NO_SHOW, postHandleNoShowSaga)]);
  yield all([takeLatest(ActionTypes.NIGHT_AUDIT_HANDLE, postHandleNightAuditSaga)]);
}
