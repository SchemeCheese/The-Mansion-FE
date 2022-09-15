import { request } from '@gilbarbara/helpers';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ReservationEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  createReservation,
  createReservationSuccess,
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
      rooms: [
        {
          room_id: 1,
          room_type: 2,
          checkin_date: '2022-02-02',
          checkout_date: '2022-02-03',
          actual_amount: 4500000,
          charges: [
            {
              equipment_type_id: 2,
              charge_kind: 1,
              actual_amount: 1000000,
              use_date: '2022-02-02',
              paid_up: 0,
            },
            {
              equipment_type_id: 2,
              charge_kind: 1,
              actual_amount: 1000000,
              use_date: '2022-02-03',
              paid_up: 0,
            },
          ],
        },
        {
          room_id: 2,
          room_type: 2,
          checkin_date: '2022-02-04',
          checkout_date: '2022-02-05',
          actual_amount: 4800000,
          charges: [
            {
              equipment_type_id: 2,
              charge_kind: 1,
              actual_amount: 1500000,
              use_date: '2022-02-04',
              paid_up: 0,
            },
            {
              equipment_type_id: 2,
              charge_kind: 1,
              actual_amount: 1500000,
              use_date: '2022-02-05',
              paid_up: 0,
            },
          ],
        },
      ],
    },
  }));

  if (success) {
    yield put(createReservationSuccess());
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.RESERVATION_SEARCH, getSearchReservationSaga),
    takeLatest(ActionTypes.RESERVATION_CREATE, postCreateReservationSaga),
  ]);
}
