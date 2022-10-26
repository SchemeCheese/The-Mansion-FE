import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
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
  resendEmailReservationAction,
  resendEmailReservationSuccessAction,
  searchReservation,
  searchReservationFinish,
  updateGeneralInfo,
  updateGeneralInfoSuccess,
  updateNoteReservationDetail,
  updateNoteReservationDetailSuccess,
  updateRate,
  updateRateSuccess,
  updateReservationSuccess,
} from 'actions';

export function* getSearchReservationSaga({ payload }: ReturnType<typeof searchReservation>) {
  try {
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
  } catch (error) {
    console.log('Error', error);
    message.error('Something went wrong!');
  }
}

export function* postCreateReservationSaga({ payload }: ReturnType<typeof createReservation>) {
  try {
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
    } else {
      message.error('Something went wrong!');
    }
  } catch (error) {
    console.log('Error', error);
    message.error('Something went wrong!');
  }
}

export function* postUpdateReservationSaga({ payload }: ReturnType<typeof createReservation>) {
  try {
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
    } else {
      message.error('Something went wrong!');
    }
  } catch (error) {
    console.log('Error', error);
    message.error('Something went wrong!');
  }
}

export function* getReservationDetailSaga({ payload }: ReturnType<typeof getReservationDetail>) {
  try {
    let data = [];

    ({ data } = yield call(
      request,
      `${apiEndPoint(ReservationEndpoint.GET_DETAIL)}/${
        payload.reservation_id
      }/reservation-detail/${payload.reservation_detail_id}/show`,
      {
        method: 'GET',
        headers: headerWithAuthorization(),
      },
    ));

    yield put(getReservationDetailFinish({ data }));
  } catch (error) {
    console.log('Error', error);
    message.error('Something went wrong!');
  }
}

export function* getReservationSaga({ payload }: ReturnType<typeof getReservation>) {
  try {
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
  } catch (error) {
    console.log('Error', error);
    message.error('Something went wrong!');
  }
}

export function* getReservationNumberSaga({ payload }: ReturnType<typeof getReservationNumber>) {
  try {
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
  } catch (error) {
    console.log('Error', error);
    message.error('Something went wrong!');
  }
}

export function* postUpdateRateSaga({ payload }: ReturnType<typeof updateRate>) {
  try {
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
    } else {
      message.error('Something went wrong!');
    }
  } catch (error) {
    console.log('Error', error);
    message.error('Something went wrong!');
  }
}

export function* postBookRoomSaga({ payload }: ReturnType<typeof bookRoom>) {
  try {
    let success = '';

    ({ success } = yield call(
      request,
      `${apiEndPoint(ReservationEndpoint.UPDATE_RATE)}/${
        payload.payload.reservation_id
      }/reservation-detail/${payload.payload.reservation_detail_id}/book-room`,
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
      yield put(bookRoomSuccess());
    } else {
      message.error('Something went wrong!');
    }
  } catch (error) {
    console.log('Error', error);
    message.error('Something went wrong!');
  }
}

export function* postAddReservationDetailSaga({
  payload,
}: ReturnType<typeof addReservationDetail>) {
  try {
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
    } else {
      message.error('Something went wrong!');
    }
  } catch (error) {
    console.log('Error', error);
    message.error('Something went wrong!');
  }
}

export function* postCancelReservationDetailSaga({
  payload,
}: ReturnType<typeof cancelReservationDetail>) {
  try {
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
      yield put(updateGeneralInfoSuccess());
    } else {
      message.error('Something went wrong!');
    }
  } catch (error) {
    console.log('Error', error);
    message.error('Something went wrong!');
  }
}

export function* postUpdateGeneralInfoSaga({ payload }: ReturnType<typeof updateGeneralInfo>) {
  try {
    let success = '';

    ({ success } = yield call(
      request,
      `${apiEndPoint(ReservationEndpoint.UPDATE_GENERAL_INFO)}/${
        payload.payload.reservation_id
      }/reservation-detail/${payload.payload.reservation_detail_id}/update`,
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
      yield put(updateGeneralInfoSuccess());
    } else {
      message.error('Something went wrong!');
    }
  } catch (error) {
    console.log('Error', error);
    message.error('Something went wrong!');
  }
}

export function* postUpdateNoteReservationDetailSaga({
  payload,
}: ReturnType<typeof updateNoteReservationDetail>) {
  try {
    let success = '';

    ({ success } = yield call(
      request,
      `${apiEndPoint(ReservationEndpoint.UPDATE)}/${
        payload.payload.reservation_info_id
      }/reservation-detail/${payload.payload.reservation_detail_id}/update-note`,
      {
        method: 'POST',
        headers: headerWithAuthorization(),
        body: payload.payload,
      },
    ));

    if (success) {
      yield put(updateNoteReservationDetailSuccess());
    } else {
      message.error('Something went wrong!');
    }
  } catch (error) {
    console.log('Error', error);
    message.error('Something went wrong!');
  }
}

export function* getResendEmailReservationSaga({
  payload,
}: ReturnType<typeof resendEmailReservationAction>) {
  try {
    let success = '';

    ({ success } = yield call(
      request,
      `${apiEndPoint(ReservationEndpoint.RESEND_EMAIL)}/${
        payload.reservation_id
      }/resend-confirmation-email`,
      {
        method: 'GET',
        headers: headerWithAuthorization(),
      },
    ));

    if (success) {
      yield put(resendEmailReservationSuccessAction());
    } else {
      message.error('Something went wrong!');
    }
  } catch (error) {
    console.log('Error', error);
    message.error('Something went wrong!');
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
    takeLatest(ActionTypes.RESERVATION_GENERAL_INFO_UPDATE, postUpdateGeneralInfoSaga),
    takeLatest(ActionTypes.RESERVATION_DETAIL_UPDATE_NOTE, postUpdateNoteReservationDetailSaga),
    takeLatest(ActionTypes.RESERVATION_RESEND_EMAIL, getResendEmailReservationSaga),
  ]);
}
