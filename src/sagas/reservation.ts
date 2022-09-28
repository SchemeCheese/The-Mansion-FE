import { request } from '@gilbarbara/helpers';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ReservationEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  createReservation,
  createReservationSuccess,
  getReservation,
  getReservationDetail,
  getReservationDetailFinish,
  getReservationFinish,
  getReservationNumber,
  getReservationNumberFinish,
  searchReservation,
  searchReservationFinish,
  updateReservationSuccess,
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
    },
  }));

  if (success) {
    yield put(createReservationSuccess());
  }
}

export function* postUpdateReservationSaga({ payload }: ReturnType<typeof createReservation>) {
  let success = '';

  ({ success } = yield call(
    request,
    apiEndPoint(`${ReservationEndpoint.UPDATE}/${payload.payload.reservation_id}/update`),
    {
      method: 'POST',
      headers: headerWithAuthorization(),
      body: {
        ...payload.payload,
        online_reservation: true,
        branch_code: 'the_mansion',
        operator_code: 'the_mansion',
        facility_code: 'hotel',
      },
    },
  ));

  if (success) {
    yield put(updateReservationSuccess());
  }
}

export function* getReservationDetailSaga({ payload }: ReturnType<typeof getReservationDetail>) {
  let data = [];

  ({ data } = yield call(
    request,
    `${apiEndPoint(ReservationEndpoint.GET_DETAIL)}/${payload.reservation_id}/reservation-detail/${
      payload.reservation_detail_id
    }/show`,
    {
      method: 'GET',
      headers: headerWithAuthorization(),
    },
  ));

  yield put(getReservationDetailFinish({ data }));
}

export function* getReservationSaga({ payload }: ReturnType<typeof getReservation>) {
  let data = [];

  ({ data } = yield call(
    request,
    `${apiEndPoint(ReservationEndpoint.DETAIL)}/${payload.reservation_id}`,
    {
      method: 'GET',
      headers: headerWithAuthorization(),
    },
  ));

  yield put(getReservationFinish({ data }));
}

export function* getReservationNumberSaga({ payload }: ReturnType<typeof getReservationNumber>) {
  let success = '';
  let reservationNumber = '';

  ({ reservation_number: reservationNumber, success } = yield call(
    request,
    apiEndPoint(ReservationEndpoint.GET_RESERVATION_NUMBER),
    {
      method: 'POST',
      headers: headerWithAuthorization(),
      body: { ...payload },
    },
  ));

  if (success) {
    yield put(getReservationNumberFinish({ reservation_number: reservationNumber }));
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.RESERVATION_SEARCH, getSearchReservationSaga),
    takeLatest(ActionTypes.RESERVATION_CREATE, postCreateReservationSaga),
    takeLatest(ActionTypes.RESERVATION_UPDATE, postUpdateReservationSaga),
    takeLatest(ActionTypes.RESERVATION_GET_DETAIL, getReservationDetailSaga),
    takeLatest(ActionTypes.RESERVATION_NUMBER_GET, getReservationNumberSaga),
    takeLatest(ActionTypes.RESERVATION_GET, getReservationSaga),
  ]);
}
