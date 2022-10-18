import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { TransactionEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  addItemAction,
  addItemActionSuccess,
  changeDiskAction,
  changeDiskActionSuccess,
  deleteItemAction,
  deleteItemActionSuccess,
} from 'actions';

export function* postAddItemSaga({ payload }: ReturnType<typeof addItemAction>) {
  try {
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
    } else {
      message.error('Something went wrong!');
    }
  } catch (error) {
    console.log('Error', error);
    message.error('Something went wrong!');
  }
}

export function* postDeleteItemSaga({ payload }: ReturnType<typeof deleteItemAction>) {
  try {
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
    } else {
      message.error('Something went wrong!');
    }
  } catch (error) {
    console.log('Error', error);
    message.error('Something went wrong!');
  }
}

export function* postChangeDiskSaga({ payload }: ReturnType<typeof changeDiskAction>) {
  try {
    let success = '';

    ({ success } = yield call(request, `${apiEndPoint(TransactionEndpoint.CHANGE_DISK)}`, {
      method: 'POST',
      headers: headerWithAuthorization(),
      body: {
        ...payload.payload,
      },
    }));

    if (success) {
      yield put(changeDiskActionSuccess());
    } else {
      message.error('Something went wrong!');
    }
  } catch (error) {
    console.log('Error', error);
    message.error('Something went wrong!');
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.TRANSACTION_ADD_ITEM, postAddItemSaga)]);
  yield all([takeLatest(ActionTypes.TRANSACTION_DELETE_ITEM, postDeleteItemSaga)]);
  yield all([takeLatest(ActionTypes.TRANSACTION_CHANGE_DISK, postChangeDiskSaga)]);
}
