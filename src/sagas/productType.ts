import { request } from '@gilbarbara/helpers';

import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { ProductTypeEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { logOut, productTypeFinish } from 'actions';
import { notify } from 'ui/notification';

export function* getProductTypeSaga() {
  try {
    let data = [];

    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});
    const query = new URLSearchParams(
      Object({ branch_code, facility_code, operator_code }),
    ).toString();

    data = yield call(request, `${apiEndPoint(ProductTypeEndpoint.GET_LIST)}?${query}`, {
      method: 'GET',
      headers: headerWithAuthorization(),
    });

    yield put(productTypeFinish({ data }));
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      notify.error('Can not get product type!');
    }
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.PRODUCT_TYPE_GET, getProductTypeSaga)]);
}
