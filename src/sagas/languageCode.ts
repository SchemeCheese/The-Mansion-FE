import { request } from '@gilbarbara/helpers';

import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { LanguageCodeEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { getLanguageCodeActionFinish, logOut } from 'actions';
import { notify } from 'ui/notification';

export function* getLanguageCodesSaga() {
  try {
    let items = [];

    ({ items } = yield call(request, `${apiEndPoint(LanguageCodeEndpoint.GET_ALL)}/vi`, {
      method: 'GET',
      headers: headerWithAuthorization(),
    }));

    yield put(getLanguageCodeActionFinish({ items }));
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      notify.error('Cannot get language code!');
    }
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.GET_LANGUAGE_CODE, getLanguageCodesSaga)]);
}
