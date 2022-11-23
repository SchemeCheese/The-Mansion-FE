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
  changeRoomAction,
  changeRoomActionSuccess,
  deleteItemAction,
  deleteItemActionSuccess,
  downloadPDFInvoiceTransaction,
  downloadPDFInvoiceTransactionSuccess,
  logOut,
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
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Something went wrong!');
    }
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
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Something went wrong!');
    }
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
      message.error('Transfer disk failed!');
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Transfer disk failed!');
    }
  }
}

export function* postChangeRoomSaga({ payload }: ReturnType<typeof changeRoomAction>) {
  try {
    let success = '';

    ({ success } = yield call(request, `${apiEndPoint(TransactionEndpoint.CHANGE_ROOM)}`, {
      method: 'POST',
      headers: headerWithAuthorization(),
      body: {
        ...payload.payload,
        operator_code: 'the_mansion',
        branch_code: 'the_mansion',
        facility_code: 'hotel',
      },
    }));

    if (success) {
      yield put(changeRoomActionSuccess());
    } else {
      message.error('Transfer room failed!');
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Transfer room failed!');
    }
  }
}

export function* getDownloadPDFInvoiceTransactionSaga({
  payload,
}: ReturnType<typeof downloadPDFInvoiceTransaction>) {
  try {
    const urlApi = `${apiEndPoint(TransactionEndpoint.DOWNLOAD_INVOICE_PDF)}/${
      payload.payload.reservation_info_id
    }/reservation-detail/${payload.payload.reservation_detail_id}/downloadInvoicePDF`;

    fetch(urlApi, {
      method: 'GET',
      headers: headerWithAuthorization(),
    }).then(response => {
      response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = payload.payload.file_name;
        a.click();
      });
    });
    yield put(downloadPDFInvoiceTransactionSuccess());
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Cannot download file!');
    }
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.TRANSACTION_ADD_ITEM, postAddItemSaga)]);
  yield all([takeLatest(ActionTypes.TRANSACTION_DELETE_ITEM, postDeleteItemSaga)]);
  yield all([takeLatest(ActionTypes.TRANSACTION_CHANGE_DISK, postChangeDiskSaga)]);
  yield all([takeLatest(ActionTypes.TRANSACTION_CHANGE_ROOM, postChangeRoomSaga)]);
  yield all([
    takeLatest(ActionTypes.TRANSACTION_INVOICE_DOWNLOAD_PDF, getDownloadPDFInvoiceTransactionSaga),
  ]);
}
