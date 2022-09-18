import { request } from '@gilbarbara/helpers';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ReservationEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  createReservation,
  createReservationSuccess,
  getReservationDetail,
  getReservationDetailFinish,
  searchReservation,
  searchReservationFinish,
} from 'actions';

export function* getSearchReservationSaga({ payload }: ReturnType<typeof searchReservation>) {
  let data = [];
  let total = 0;
  let currentPage = 0;

  const query = new URLSearchParams(Object(payload)).toString();

  ({
    current_page: currentPage,
    data,
    total,
  } = yield call(request, `${apiEndPoint(ReservationEndpoint.SEARCH)}?${query}`, {
    method: 'GET',
    headers: headerWithAuthorization(),
  }));

  yield put(
    searchReservationFinish({
      data,
      total,
      current_page: currentPage,
    }),
  );
}

export function* postCreateReservationSaga({ payload }: ReturnType<typeof createReservation>) {
  let success = '';

  ({ success } = yield call(request, apiEndPoint(ReservationEndpoint.CREATE), {
    method: 'POST',
    headers: headerWithAuthorization(),
    body: {
      ...payload.payload,
      online_reservation: true,
      branch_code: 'the_mansion',
      operator_code: 'the_mansion',
      facility_code: 'hotel',
      reservation_number: '6666',
    },
  }));

  if (success) {
    yield put(createReservationSuccess());
  }
}

export function* getReservationDetailSaga({ payload }: ReturnType<typeof getReservationDetail>) {
  let data = [];

  // const query = new URLSearchParams(Object(payload)).toString();

  ({ data } = yield call(request, `${apiEndPoint(ReservationEndpoint.GET_DETAIL)}/${payload.id}`, {
    method: 'GET',
    headers: headerWithAuthorization(),
  }));

  yield put(getReservationDetailFinish({ data }));
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.RESERVATION_SEARCH, getSearchReservationSaga),
    takeLatest(ActionTypes.RESERVATION_CREATE, postCreateReservationSaga),
    takeLatest(ActionTypes.RESERVATION_GET_DETAIL, getReservationDetailSaga),
  ]);
}
