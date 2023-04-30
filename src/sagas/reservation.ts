import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

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
  downloadDocxReservationDetail,
  downloadDocxReservationDetailSuccess,
  downloadPDFReservationDetail,
  downloadPDFReservationDetailSuccess,
  getReservation,
  getReservationByFolio,
  getReservationByFolioFinish,
  getReservationDetail,
  getReservationDetailFinish,
  getReservationFinish,
  getReservationNumber,
  getReservationNumberFinish,
  logOut,
  paymentMomoPayReservationDetail,
  paymentVNPayReservationDetail,
  printCheckinConfirmPDFReservationDetail,
  printCheckinConfirmPDFReservationDetailSuccess,
  printDepositPDFReservationDetail,
  printDepositPDFReservationDetailSuccess,
  printRegistrationCardPDFReservationDetail,
  printRegistrationCardPDFReservationDetailSuccess,
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

    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

    const payloadWithBranch = {
      ...payload,
      operator_code,
      branch_code,
      facility_code,
    };

    const query = new URLSearchParams(Object(payloadWithBranch)).toString();

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

export function* postCreateReservationSaga({ payload }: ReturnType<typeof createReservation>) {
  try {
    let success = '';
    let reservationCreated = null;

    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

    ({ reservation_info: reservationCreated, success } = yield call(
      request,
      apiEndPoint(ReservationEndpoint.CREATE),
      {
        method: 'POST',
        headers: headerWithAuthorization(),
        body: {
          ...payload.payload,
          online_reservation: true,
          branch_code,
          operator_code,
          facility_code,
        },
      },
    ));

    if (success) {
      yield put(
        createReservationSuccess({
          reservation_info: reservationCreated,
        }),
      );
    } else {
      message.error('Something went wrong!');
    }
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

export function* postUpdateReservationSaga({ payload }: ReturnType<typeof createReservation>) {
  try {
    let success = '';
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

    ({ success } = yield call(
      request,
      apiEndPoint(`${ReservationEndpoint.UPDATE}/${payload.payload.reservation_id}/update`),
      {
        method: 'POST',
        headers: headerWithAuthorization(),
        body: {
          ...payload.payload,
          online_reservation: true,
          branch_code,
          operator_code,
          facility_code,
        },
      },
    ));

    if (success) {
      yield put(updateReservationSuccess());
    } else {
      message.error('Something went wrong!');
    }
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

export function* getReservationDetailSaga({ payload }: ReturnType<typeof getReservationDetail>) {
  try {
    let data = [];
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

    const payloadBranch = {
      operator_code,
      branch_code,
      facility_code,
    };

    const query = new URLSearchParams(Object(payloadBranch)).toString();

    ({ data } = yield call(
      request,
      `${apiEndPoint(ReservationEndpoint.GET_DETAIL)}/${
        payload.reservation_id
      }/reservation-detail/${payload.reservation_detail_id}/show?${query}`,
      {
        method: 'GET',
        headers: headerWithAuthorization(),
      },
    ));

    yield put(getReservationDetailFinish({ data }));
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

export function* getReservationFolioSaga({ payload }: ReturnType<typeof getReservationByFolio>) {
  try {
    let data = [];

    ({ data } = yield call(
      request,
      `${apiEndPoint(ReservationEndpoint.GET_BY_FOLIO)}/${payload.folio}`,
      {
        method: 'GET',
        headers: headerWithAuthorization(),
      },
    ));

    yield put(getReservationByFolioFinish({ data }));
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.warning('No reservation found!');
    }
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

export function* postUpdateRateSaga({ payload }: ReturnType<typeof updateRate>) {
  try {
    let success = '';
    const { operator_code } = yield select(s => s.branchInfo || {});

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
          operator_code,
        },
      },
    ));

    if (success) {
      yield put(updateRateSuccess());
    } else {
      message.error('Something went wrong!');
    }
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

export function* postBookRoomSaga({ payload }: ReturnType<typeof bookRoom>) {
  try {
    let success = '';
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

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
          branch_code,
          operator_code,
          facility_code,
        },
      },
    ));

    if (success) {
      yield put(bookRoomSuccess());
    } else {
      message.error('Something went wrong!');
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error(
        'Booking room is not success! The room you selected may have already been booked. Please F5 to get the latest data',
      );
    }
  }
}

export function* postAddReservationDetailSaga({
  payload,
}: ReturnType<typeof addReservationDetail>) {
  try {
    let success = '';
    const { operator_code } = yield select(s => s.branchInfo || {});

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
          operator_code,
        },
      },
    ));

    if (success) {
      yield put(addReservationDetailSuccess());
    } else {
      message.error('Something went wrong!');
    }
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

export function* postCancelReservationDetailSaga({
  payload,
}: ReturnType<typeof cancelReservationDetail>) {
  try {
    let success = '';
    const { operator_code } = yield select(s => s.branchInfo || {});

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
          operator_code,
        },
      },
    ));

    if (success) {
      yield put(cancelReservationDetailSuccess());
      yield put(updateGeneralInfoSuccess());
    } else {
      message.error('Something went wrong!');
    }
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

export function* postUpdateGeneralInfoSaga({ payload }: ReturnType<typeof updateGeneralInfo>) {
  try {
    let success = '';
    const { operator_code } = yield select(s => s.branchInfo || {});

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
          operator_code,
        },
      },
    ));

    if (success) {
      yield put(updateGeneralInfoSuccess());
    } else {
      message.error('Something went wrong!');
    }
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

export function* getResendEmailReservationSaga({
  payload,
}: ReturnType<typeof resendEmailReservationAction>) {
  try {
    let success = '';

    ({ success } = yield call(
      request,
      `${apiEndPoint(ReservationEndpoint.RESEND_EMAIL)}/${
        payload.reservation_id
      }/resend-confirmation-email/${payload.language}`,
      {
        method: 'POST',
        headers: headerWithAuthorization(),
        body: {
          is_hide_room_rate: payload.is_hide_room_rate,
        },
      },
    ));

    if (success) {
      yield put(resendEmailReservationSuccessAction());
    } else {
      message.error('Something went wrong!');
    }
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

export function* getDownloadPDFReservationDetailSaga({
  payload,
}: ReturnType<typeof downloadPDFReservationDetail>) {
  try {
    const urlApi = `${apiEndPoint(ReservationEndpoint.DOWNLOAD_PDF)}/${
      payload.payload.reservation_info_id
    }/reservation-detail/${payload.payload.language}/downloadPdf`;

    fetch(urlApi, {
      method: 'GET',
      headers: headerWithAuthorization(),
    }).then(response => {
      response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = payload.payload.file_name;
        a.click();
      });
    });
    yield put(downloadPDFReservationDetailSuccess());
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Cannot download file!');
    }
  }
}

export function* getDownloadDocxReservationDetailSaga({
  payload,
}: ReturnType<typeof downloadDocxReservationDetail>) {
  try {
    const urlApi = `${apiEndPoint(ReservationEndpoint.DOWNLOAD_DOCX)}/${
      payload.payload.reservation_info_id
    }/reservation-detail/${payload.payload.language}/downloadDocx`;

    fetch(urlApi, {
      method: 'GET',
      headers: headerWithAuthorization(),
    }).then(response => {
      response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = payload.payload.file_name;
        a.click();
      });
    });
    yield put(downloadDocxReservationDetailSuccess());
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Cannot download file!');
    }
  }
}

export function* getPrintRegistrationCardPDFReservationDetailSaga({
  payload,
}: ReturnType<typeof printRegistrationCardPDFReservationDetail>) {
  try {
    const urlApi = `${apiEndPoint(ReservationEndpoint.PRINT_REGISTRATION_CARD_PDF)}/${
      payload.payload.reservation_info_id
    }/reservation-detail/${payload.payload.reservation_detail_id}/${
      payload.payload.language
    }/downloadRegistrationCardPDF`;

    fetch(urlApi, {
      method: 'GET',
      headers: headerWithAuthorization(),
    }).then(response => {
      response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob);

        window.open(url)?.print();
      });
    });

    yield put(printRegistrationCardPDFReservationDetailSuccess());
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Cannot download file!');
    }
  }
}

export function* getPrintDepositPDFReservationDetailSaga({
  payload,
}: ReturnType<typeof printDepositPDFReservationDetail>) {
  try {
    const urlApi = `${apiEndPoint(ReservationEndpoint.PRINT_DEPOSIT_PDF)}/${
      payload.payload.reservation_info_id
    }/reservation-detail/${payload.payload.reservation_detail_id}/${
      payload.payload.language
    }/download-deposit-pdf?payment_method=${payload.payload.payment_method}`;

    fetch(urlApi, {
      method: 'GET',
      headers: headerWithAuthorization(),
    }).then(response => {
      response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob);

        window.open(url)?.print();
      });
    });

    yield put(printDepositPDFReservationDetailSuccess());
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Cannot download file!');
    }
  }
}

export function* getPrintCheckinConfirmPDFReservationDetailSaga({
  payload,
}: ReturnType<typeof printCheckinConfirmPDFReservationDetail>) {
  try {
    const urlApi = `${apiEndPoint(ReservationEndpoint.PRINT_REGISTRATION_CARD_PDF)}/${
      payload.payload.reservation_info_id
    }/reservation-detail/${
      payload.payload.language
    }/downloadCheckinConfirmationPDF?reservationDetailIds=${
      payload.payload.reservation_detail_ids
    }`;

    fetch(urlApi, {
      method: 'GET',
      headers: headerWithAuthorization(),
    }).then(response => {
      response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob);

        window.open(url)?.print();
      });
    });

    yield put(printCheckinConfirmPDFReservationDetailSuccess());
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Cannot download file!');
    }
  }
}

export function* paymentVNPaySaga({ payload }: ReturnType<typeof paymentVNPayReservationDetail>) {
  try {
    let url = '';

    ({ url } = yield call(
      request,
      `${apiEndPoint(ReservationEndpoint.VN_PAYMENT)}/${
        payload.payload.reservation_id
      }/reservation-detail/${payload.payload.reservation_detail_id}/paymentVNPayment`,
      {
        method: 'POST',
        headers: headerWithAuthorization(),
        body: {
          ...payload.payload,
        },
      },
    ));

    const win = window.open(url, '_blank');

    if (win != null) {
      win.focus();
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Can not create payment!');
    }
  }
}

export function* paymentMomoPaySaga({
  payload,
}: ReturnType<typeof paymentMomoPayReservationDetail>) {
  try {
    let url = '';

    ({ url } = yield call(
      request,
      `${apiEndPoint(ReservationEndpoint.MOMO_PAYMENT)}/${
        payload.payload.reservation_id
      }/reservation-detail/${payload.payload.reservation_detail_id}/paymentMomoPay`,
      {
        method: 'POST',
        headers: headerWithAuthorization(),
        body: {
          ...payload.payload,
        },
      },
    ));

    const win = window.open(url, '_blank');

    if (win != null) {
      win.focus();
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Can not create payment!');
    }
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
    takeLatest(ActionTypes.RESERVATION_DETAIL_DOWNLOAD_PDF, getDownloadPDFReservationDetailSaga),
    takeLatest(ActionTypes.RESERVATION_DETAIL_DOWNLOAD_DOCX, getDownloadDocxReservationDetailSaga),
    takeLatest(ActionTypes.RESERVATION_GET_BY_FOLIO, getReservationFolioSaga),
    takeLatest(
      ActionTypes.RESERVATION_DETAIL_PRINT_REGISTRATION_CARD_PDF,
      getPrintRegistrationCardPDFReservationDetailSaga,
    ),
    takeLatest(
      ActionTypes.RESERVATION_DETAIL_PRINT_CHECKIN_CONFIRM_PDF,
      getPrintCheckinConfirmPDFReservationDetailSaga,
    ),
    takeLatest(
      ActionTypes.RESERVATION_DETAIL_PRINT_DEPOSIT_PDF,
      getPrintDepositPDFReservationDetailSaga,
    ),
    takeLatest(ActionTypes.RESERVATION_DETAIL_PAYMENT_VNPAY, paymentVNPaySaga),
    takeLatest(ActionTypes.RESERVATION_DETAIL_PAYMENT_MOMOPAY, paymentMomoPaySaga),
  ]);
}
