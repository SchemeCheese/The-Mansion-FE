import { request } from '@gilbarbara/helpers';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ReservationEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  addReservationDetail,
  addReservationDetailSuccess,
  bookRoom,
  bookRoomSuccess,
  cancelReservationDetail,
  cancelReservationDetailSuccess,
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
  updateRate,
  updateRateSuccess,
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

export function* postUpdateRateSaga({ payload }: ReturnType<typeof updateRate>) {
  let success = '';

  ({ success } = yield call(
    request,
    `${apiEndPoint(ReservationEndpoint.UPDATE_RATE)}/${
      payload.payload.reservation_id
    }/reservation-detail/${payload.payload.reservation_detail_id}/update-rate`,
    {
      method: 'POST',
      headers: headerWithAuthorization(),
      body: {
        ...payload.payload,
        operator_code: 'the_mansion',
      },
    },
  ));

  if (success) {
    yield put(updateRateSuccess());
  }
}

export function* postBookRoomSaga({ payload }: ReturnType<typeof bookRoom>) {
  let success = '';

  ({ success } = yield call(request, apiEndPoint(ReservationEndpoint.BOOK_ROOM), {
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
    yield put(bookRoomSuccess());
  }
}

export function* postAddReservationDetailSaga({
  payload,
}: ReturnType<typeof addReservationDetail>) {
  let success = '';

  ({ success } = yield call(
    request,
    `${apiEndPoint(ReservationEndpoint.ADD_RESERVATION_DETAIL)}/${
      payload.payload.reservation_id
    }/add-reservation-detail`,
    {
      method: 'POST',
      headers: headerWithAuthorization(),
      body: {
        ...payload.payload,
        operator_code: 'the_mansion',
      },
    },
  ));

  if (success) {
    yield put(addReservationDetailSuccess());
  }
}

export function* postCancelReservationDetailSaga({
  payload,
}: ReturnType<typeof cancelReservationDetail>) {
  let success = '';

  ({ success } = yield call(
    request,
    `${apiEndPoint(ReservationEndpoint.CANCEL_RESERVATION_DETAIL)}/${
      payload.payload.reservation_id
    }/cancel-reservation-detail`,
    {
      method: 'POST',
      headers: headerWithAuthorization(),
      body: {
        ...payload.payload,
        operator_code: 'the_mansion',
      },
    },
  ));

  if (success) {
    yield put(cancelReservationDetailSuccess());
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
    takeLatest(ActionTypes.RESERVATION_RATE_UPDATE, postUpdateRateSaga),
    takeLatest(ActionTypes.RESERVATION_BOOK_ROOM, postBookRoomSaga),
    takeLatest(ActionTypes.RESERVATION_ADD_RESERVATION_DETAIL, postAddReservationDetailSaga),
    takeLatest(ActionTypes.RESERVATION_CANCEL_RESERVATION_DETAIL, postCancelReservationDetailSaga),
  ]);
}
