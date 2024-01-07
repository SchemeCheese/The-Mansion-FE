import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { PaymentEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  createPaymentAction,
  createPaymentSuccess,
  createQRCodeVNPayAction,
  createQRCodeVNPaySuccessAction,
  logOut,
  updatePaymentDetail,
  updatePaymentDetailSuccess,
} from 'actions';

export function* postCreatePaymentSaga({ payload }: ReturnType<typeof createPaymentAction>) {
  try {
    let success = '';
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

    ({ success } = yield call(request, `${apiEndPoint(PaymentEndpoint.CREATE_PAYMENT)}`, {
      method: 'POST',
      headers: headerWithAuthorization(),
      body: {
        ...payload.payload,
        branch_code,
        operator_code,
        facility_code,
      },
    }));

    if (success) {
      yield put(createPaymentSuccess());
    } else {
      message.error('Can not create payment!');
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

export function* postCreateQRCodeVNPaySaga({
  payload,
}: ReturnType<typeof createQRCodeVNPayAction>) {
  try {
    let success = '';
    let data = '';
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

    ({ data, success } = yield call(
      request,
      `${apiEndPoint(PaymentEndpoint.CREATE_QRCODE_VNPAY)}/${
        payload.payload.reservation_info_id
      }/reservation-detail/${payload.payload.reservation_detail_id}/createQRCodeVNPay`,
      {
        method: 'POST',
        headers: headerWithAuthorization(),
        body: {
          ...payload.payload,
          branch_code,
          operator_code,
          facility_code,
        },
      },
    ));

    if (success) {
      yield put(
        createQRCodeVNPaySuccessAction({
          result: data,
        }),
      );
    } else {
      message.error('Can not create QRCode VNPay!');
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

export function* postUpdatePaymentDetailSaga({ payload }: ReturnType<typeof updatePaymentDetail>) {
  try {
    let success = '';

    ({ success } = yield call(
      request,
      `${apiEndPoint(PaymentEndpoint.UPDATE_PAYMENT_DETAIL)}/${
        payload.payload.payment_detail_id
      }/update`,
      {
        method: 'POST',
        headers: headerWithAuthorization(),
        body: {
          ...payload.payload,
        },
      },
    ));

    if (success) {
      yield put(updatePaymentDetailSuccess());
    } else {
      message.error('Update Payment Detail Failed!');
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Update Payment Detail Failed!');
    }
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.PAYMENT_CREATE, postCreatePaymentSaga)]);
  yield all([takeLatest(ActionTypes.CREATE_QRCODE_VNPAY, postCreateQRCodeVNPaySaga)]);
  yield all([takeLatest(ActionTypes.UPDATE_PAYMENT_DETAIL, postUpdatePaymentDetailSaga)]);
}
