import { request } from '@gilbarbara/helpers';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ReservationEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { searchScheduleAction, searchScheduleActionSuccess } from 'actions';

export function* getSearchScheduleSaga({ payload }: ReturnType<typeof searchScheduleAction>) {
  let data = [];
  const query = new URLSearchParams(Object(payload)).toString();

  ({ data } = yield call(request, `${apiEndPoint(ReservationEndpoint.SEARCH_SCHEDULE)}?${query}`, {
    method: 'GET',
    headers: headerWithAuthorization(),
  }));

  yield put(searchScheduleActionSuccess({ data }));
}

export default function* root() {
  yield all([takeLatest(ActionTypes.RESERVATION_FETCH_SCHEDULE, getSearchScheduleSaga)]);
}
