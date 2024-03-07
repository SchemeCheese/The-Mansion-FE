import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { CustomerEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  getCustomerDetailAction,
  getCustomerDetailSuccessAction,
  searchCustomer,
  searchCustomerFinish,
} from 'actions';

export function* getSearchCustomer({ payload }: ReturnType<typeof searchCustomer>) {
  try {
    let data = [];
    let total = 0;
    let currentPage = 0;
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

    const query = new URLSearchParams(Object(payload)).toString();

    ({
      current_page: currentPage,
      data,
      total,
    } = yield call(
      request,
      `${apiEndPoint(
        CustomerEndpoint.SEARCH,
      )}?${query}&branch_code=${branch_code}&operator_code=${operator_code}&facility_code=${facility_code}`,
      {
        method: 'GET',
        headers: headerWithAuthorization(),
      },
    ));

    yield put(
      searchCustomerFinish({
        data,
        total,
        current_page: currentPage,
      }),
    );
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error get customer', error);
    }
  }
}

export function* getCustomerDetailSaga({ payload }: ReturnType<typeof getCustomerDetailAction>) {
  try {
    let data = {};
    let success = false;

    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

    const payloadWithBranch = {
      ...payload,
      operator_code,
      branch_code,
      facility_code,
    };

    const query = new URLSearchParams(Object(payloadWithBranch)).toString();

    ({ data, success } = yield call(
      request,
      `${apiEndPoint(CustomerEndpoint.GET_DETAIL(payload.id))}?${query}`,
      {
        method: 'GET',
        headers: headerWithAuthorization(),
      },
    ));

    if (success) {
      yield put(
        getCustomerDetailSuccessAction({
          data,
        }),
      );
    } else {
      message.error('Error get customer!');
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error get customer', error);
    }

    window.location.href = '/';
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.CUSTOMER_SEARCH, getSearchCustomer)]);
  yield all([takeLatest(ActionTypes.GET_CUSTOMER_DETAIL, getCustomerDetailSaga)]);
}
