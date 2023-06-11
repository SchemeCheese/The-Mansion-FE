import { request } from '@gilbarbara/helpers';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { CustomerEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { searchCustomer, searchCustomerFinish } from 'actions';

export function* getSearchCustomer({ payload }: ReturnType<typeof searchCustomer>) {
  let data = [];
  let total = 0;
  let currentPage = 0;

  const query = new URLSearchParams(Object(payload)).toString();

  ({
    current_page: currentPage,
    data,
    total,
  } = yield call(request, `${apiEndPoint(CustomerEndpoint.SEARCH)}?${query}`, {
    method: 'GET',
    headers: headerWithAuthorization(),
  }));

  yield put(
    searchCustomerFinish({
      data,
      total,
      current_page: currentPage,
    }),
  );
}

export default function* root() {
  yield all([takeLatest(ActionTypes.CUSTOMER_SEARCH, getSearchCustomer)]);
}
