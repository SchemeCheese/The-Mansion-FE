import { request } from '@gilbarbara/helpers';
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
}

export function* postCheckout({ payload }: ReturnType<typeof checkoutAction>) {
  const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

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
}

export default function* root() {
  yield all([takeLatest(ActionTypes.ADD_LATE_CHECKOUT_FEE, postAddLateCheckoutFee)]);
  yield all([takeLatest(ActionTypes.CHECKOUT, postCheckout)]);
}
