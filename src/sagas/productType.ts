import { request } from '@gilbarbara/helpers';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ProductTypeEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { productTypeFinish } from 'actions';

export function* getProductTypeSaga() {
  let data = [];

  data = yield call(request, `${apiEndPoint(ProductTypeEndpoint.GET_LIST)}`, {
    method: 'GET',
    headers: headerWithAuthorization(),
  });

  yield put(productTypeFinish({ data }));
}

export default function* root() {
  yield all([takeLatest(ActionTypes.PRODUCT_TYPE_GET, getProductTypeSaga)]);
}
