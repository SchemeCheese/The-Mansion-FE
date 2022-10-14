import { request } from '@gilbarbara/helpers';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { TransactionEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  addItemAction,
  addItemActionSuccess,
  deleteItemAction,
  deleteItemActionSuccess,
} from 'actions';

export function* postAddItemSaga({ payload }: ReturnType<typeof addItemAction>) {
  let success = '';

  ({ success } = yield call(request, `${apiEndPoint(TransactionEndpoint.ADD_ITEM)}`, {
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
    yield put(addItemActionSuccess());
  }
}

export function* postDeleteItemSaga({ payload }: ReturnType<typeof deleteItemAction>) {
  let success = '';

  ({ success } = yield call(request, `${apiEndPoint(TransactionEndpoint.DELETE_ITEM)}`, {
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
    yield put(deleteItemActionSuccess());
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.TRANSACTION_ADD_ITEM, postAddItemSaga)]);
  yield all([takeLatest(ActionTypes.TRANSACTION_DELETE_ITEM, postDeleteItemSaga)]);
}
