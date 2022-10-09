import { request } from '@gilbarbara/helpers';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ReservationEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  searchAvailableScheduleAction,
  searchAvailableScheduleActionSuccess,
  searchScheduleAction,
  searchScheduleActionSuccess,
} from 'actions';

export function* getSearchScheduleSaga({ payload }: ReturnType<typeof searchScheduleAction>) {
  let data = [];
  const query = new URLSearchParams(Object(payload)).toString();

  ({ data } = yield call(request, `${apiEndPoint(ReservationEndpoint.SEARCH_SCHEDULE)}?${query}`, {
    method: 'GET',
    headers: headerWithAuthorization(),
  }));

  yield put(searchScheduleActionSuccess({ data }));
}

export function* getSearchAvailableScheduleSaga({
  payload,
}: ReturnType<typeof searchAvailableScheduleAction>) {
  let data = [];
  const query = new URLSearchParams(Object(payload)).toString();

  ({ data } = yield call(
    request,
    `${apiEndPoint(ReservationEndpoint.SEARCH_AVAILABLE_SCHEDULE)}?${query}`,
    {
      method: 'GET',
      headers: headerWithAuthorization(),
    },
  ));

  console.log('000 data', data);

  yield put(searchAvailableScheduleActionSuccess({ data }));
}

export default function* root() {
  yield all([takeLatest(ActionTypes.RESERVATION_FETCH_SCHEDULE, getSearchScheduleSaga)]);
  yield all([
    takeLatest(ActionTypes.RESERVATION_FETCH_AVAILABLE_SCHEDULE, getSearchAvailableScheduleSaga),
  ]);
}
