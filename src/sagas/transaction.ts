import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { TransactionEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  addDiskAction,
  addDiskActionSuccess,
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

export function* postAddDiskSaga({ payload }: ReturnType<typeof addDiskAction>) {
  try {
    let success = '';
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

    ({ success } = yield call(request, `${apiEndPoint(TransactionEndpoint.ADD_DISK)}`, {
      method: 'POST',
      headers: headerWithAuthorization(),
      body: {
        ...payload.payload,
        branch_code,
        operator_code,
        facility_code,
      },
    }));

    if (success) {
      yield put(addDiskActionSuccess());
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

export function* postAddItemSaga({ payload }: ReturnType<typeof addItemAction>) {
  try {
    let success = '';
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

    ({ success } = yield call(request, `${apiEndPoint(TransactionEndpoint.ADD_ITEM)}`, {
      method: 'POST',
      headers: headerWithAuthorization(),
      body: {
        ...payload.payload,
        branch_code,
        operator_code,
        facility_code,
      },
    }));

    if (success) {
      yield put(addItemActionSuccess());
    } else {
      message.error('Something went wrong!');
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error.response);
    }

    if (error.status === 422) {
      message.warning(error.response.message);
    } else if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Something went wrong!');
    }
  }
}

export function* postDeleteItemSaga({ payload }: ReturnType<typeof deleteItemAction>) {
  try {
    let success = '';
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

    ({ success } = yield call(request, `${apiEndPoint(TransactionEndpoint.DELETE_ITEM)}`, {
      method: 'POST',
      headers: headerWithAuthorization(),
      body: {
        ...payload.payload,
        branch_code,
        operator_code,
        facility_code,
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
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

    ({ success } = yield call(request, `${apiEndPoint(TransactionEndpoint.CHANGE_ROOM)}`, {
      method: 'POST',
      headers: headerWithAuthorization(),
      body: {
        ...payload.payload,
        operator_code,
        branch_code,
        facility_code,
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
    }/reservation-detail/${payload.payload.reservation_detail_id}/${
      payload.payload.language
    }/payment/${payload.payload.payment_id}/downloadInvoicePDF`;

    fetch(urlApi, {
      method: 'GET',
      headers: headerWithAuthorization(),
    }).then(response => {
      response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob);
        const iframe = document.createElement('iframe'); // load content in an iframe to print later

        document.body.appendChild(iframe);

        iframe.style.display = 'none';
        iframe.src = url;

        iframe.onload = function () {
          setTimeout(function () {
            iframe.focus();
            iframe.contentWindow?.print();
          }, 1);
        };
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
  yield all([takeLatest(ActionTypes.TRANSACTION_ADD_DISK, postAddDiskSaga)]);
  yield all([takeLatest(ActionTypes.TRANSACTION_ADD_ITEM, postAddItemSaga)]);
  yield all([takeLatest(ActionTypes.TRANSACTION_DELETE_ITEM, postDeleteItemSaga)]);
  yield all([takeLatest(ActionTypes.TRANSACTION_CHANGE_DISK, postChangeDiskSaga)]);
  yield all([takeLatest(ActionTypes.TRANSACTION_CHANGE_ROOM, postChangeRoomSaga)]);
  yield all([
    takeLatest(ActionTypes.TRANSACTION_INVOICE_DOWNLOAD_PDF, getDownloadPDFInvoiceTransactionSaga),
  ]);
}
