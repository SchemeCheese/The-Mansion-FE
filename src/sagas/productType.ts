import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ProductTypeEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { logOut, productTypeFinish } from 'actions';

export function* getProductTypeSaga() {
  try {
    let data = [];

    data = yield call(request, `${apiEndPoint(ProductTypeEndpoint.GET_LIST)}`, {
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
      message.error('Can not get product type!');
    }
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.PRODUCT_TYPE_GET, getProductTypeSaga)]);
}
