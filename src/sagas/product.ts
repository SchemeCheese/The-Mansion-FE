import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ProductEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { logOut, searchProduct, searchProductFinish } from 'actions';

export function* getSearchProductSaga({ payload }: ReturnType<typeof searchProduct>) {
  try {
    let data = [];
    const query = new URLSearchParams(Object(payload)).toString();

    data = yield call(request, `${apiEndPoint(ProductEndpoint.SEARCH)}?${query}`, {
      method: 'GET',
      headers: headerWithAuthorization(),
    });

    yield put(searchProductFinish({ data }));
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Can not search product!');
    }
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.PRODUCT_SEARCH, getSearchProductSaga)]);
}
