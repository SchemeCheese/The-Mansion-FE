import { request } from '@gilbarbara/helpers';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { PaymentEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { createPaymentAction, createPaymentSuccess } from 'actions';

export function* postCreatePaymentSaga({ payload }: ReturnType<typeof createPaymentAction>) {
  let success = '';

  ({ success } = yield call(request, `${apiEndPoint(PaymentEndpoint.CREATE_PAYMENT)}`, {
    method: 'POST',
    headers: headerWithAuthorization(),
    body: {
      ...payload.payload,
      branch_code: 'the_mansion',
      operator_code: 'the_mansion',
      facility_code: 'hotel',
    },
  }));

  if (success) {
    yield put(createPaymentSuccess());
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.PAYMENT_CREATE, postCreatePaymentSaga)]);
}
