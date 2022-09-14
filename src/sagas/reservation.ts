import { request } from '@gilbarbara/helpers';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ReservationEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { searchReservation, searchReservationFinish } from 'actions';

export function* getSearchReservation({ payload }: ReturnType<typeof searchReservation>) {
  let data = [];
  let total = 0;
  let currentPage = 0;

  console.log('Sagaaaaa', payload);

  const query = new URLSearchParams(Object(payload)).toString();

  console.log('Querry', query);

  ({
    current_page: currentPage,
    data,
    total,
  } = yield call(request, `${apiEndPoint(ReservationEndpoint.SEARCH)}?${query}`, {
    method: 'GET',
    headers: headerWithAuthorization(),
  }));

  console.log('AAAAAAA', data);

  yield put(
    searchReservationFinish({
      data,
      total,
      current_page: currentPage,
    }),
  );
}

export default function* root() {
  yield all([takeLatest(ActionTypes.RESERVATION_SEARCH, getSearchReservation)]);
}
