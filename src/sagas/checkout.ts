import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { ReservationEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  addLateCheckoutFeeAction,
  addLateCheckoutFeeSuccessAction,
  checkoutAction,
  checkoutSuccessAction,
} from 'actions';

export function* postAddLateCheckoutFee({ payload }: ReturnType<typeof addLateCheckoutFeeAction>) {
  const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

  try {
    yield call(
      request,
      `${apiEndPoint(ReservationEndpoint.CHECKOUT_ADD_LATE_FEE)}/${
        payload.payload.reservation_id
      }/add-late-checkout-fee`,
      {
        method: 'POST',
        headers: headerWithAuthorization(),
        body: {
          ...payload.payload,
          operator_code,
          branch_code,
          facility_code,
        },
      },
    );

    yield put(addLateCheckoutFeeSuccessAction());
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error add late checkout fee: ', error);
    }

    message.error('Cannot add late checkout fee!');
  }
}

export function* postCheckout({ payload }: ReturnType<typeof checkoutAction>) {
  const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

  try {
    yield call(
      request,
      `${apiEndPoint(ReservationEndpoint.CHECKOUT)}/${
        payload.payload.reservation_id
      }/reservation-detail/${payload.payload.reservation_detail_id}/checkout`,
      {
        method: 'POST',
        headers: headerWithAuthorization(),
        body: {
          ...payload.payload,
          operator_code,
          branch_code,
          facility_code,
        },
      },
    );

    yield put(checkoutSuccessAction());
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error cannot checkout', error);
    }

    message.error('Cannot checkout!');
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.ADD_LATE_CHECKOUT_FEE, postAddLateCheckoutFee)]);
  yield all([takeLatest(ActionTypes.CHECKOUT, postCheckout)]);
}
