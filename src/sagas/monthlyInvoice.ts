import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { MonthlyInvoiceEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  getMonthlyInvoicesAction,
  getMonthlyInvoicesActionFinish,
  logOut,
  paymentMonthlyInvoiceAction,
  paymentMonthlyInvoiceActionSuccess,
} from 'actions';

export function* getMonthlyInvoiceSaga({ payload }: ReturnType<typeof getMonthlyInvoicesAction>) {
  try {
    let data = [];

    ({ data } = yield call(
      request,
      `${apiEndPoint(MonthlyInvoiceEndpoint.GET_MONTHLY_INVOICE)}/${
        payload.reservation_info_id
      }/reservation-detail/${payload.reservation_detail_id}/monthly-invoices`,
      {
        method: 'GET',
        headers: headerWithAuthorization(),
      },
    ));

    yield put(getMonthlyInvoicesActionFinish({ data }));
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Can not get monthly info!');
    }
  }
}

export function* postPaymentMonthlyInvoiceSaga({
  payload,
}: ReturnType<typeof paymentMonthlyInvoiceAction>) {
  try {
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

    yield call(
      request,
      `${apiEndPoint(MonthlyInvoiceEndpoint.GET_MONTHLY_INVOICE)}/${
        payload.payload.reservation_info_id
      }/reservation-detail/${payload.payload.reservation_detail_id}/payment-monthly-invoices`,
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
    );

    yield put(paymentMonthlyInvoiceActionSuccess());
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Can not payment!');
    }
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.GET_MONTHLY_INVOICE, getMonthlyInvoiceSaga)]);
  yield all([takeLatest(ActionTypes.PAYMENT_MONTHLY_INVOICE, postPaymentMonthlyInvoiceSaga)]);
}
