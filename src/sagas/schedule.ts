import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { ReservationEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  logOut,
  searchAvailableScheduleAction,
  searchAvailableScheduleActionSuccess,
  searchScheduleAction,
  searchScheduleActionSuccess,
} from 'actions';

export function* getSearchScheduleSaga({ payload }: ReturnType<typeof searchScheduleAction>) {
  try {
    let data = [];
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

    const payloadWithBranch = {
      start_date: payload.start_date,
      end_date: payload.end_date,
      room_number: payload.room_number,
      room_type: payload.room_type,
      operator_code,
      branch_code,
      facility_code,
    };

    const query = new URLSearchParams(Object(payloadWithBranch)).toString();

    ({ data } = yield call(
      request,
      `${apiEndPoint(ReservationEndpoint.SEARCH_SCHEDULE)}?${query}`,
      {
        method: 'GET',
        headers: headerWithAuthorization(),
      },
    ));

    yield put(searchScheduleActionSuccess({ data }));
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Something went wrong!');
    }
  }
}

export function* getSearchAvailableScheduleSaga({
  payload,
}: ReturnType<typeof searchAvailableScheduleAction>) {
  try {
    let data = [];
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

    const payloadWithBranch = {
      ...payload,
      operator_code,
      branch_code,
      facility_code,
    };

    const query = new URLSearchParams(Object(payloadWithBranch)).toString();

    ({ data } = yield call(
      request,
      `${apiEndPoint(ReservationEndpoint.SEARCH_AVAILABLE_SCHEDULE)}?${query}`,
      {
        method: 'GET',
        headers: headerWithAuthorization(),
      },
    ));

    yield put(searchAvailableScheduleActionSuccess({ data }));
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Something went wrong!');
    }
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.RESERVATION_FETCH_SCHEDULE, getSearchScheduleSaga)]);
  yield all([
    takeLatest(ActionTypes.RESERVATION_FETCH_AVAILABLE_SCHEDULE, getSearchAvailableScheduleSaga),
  ]);
}
