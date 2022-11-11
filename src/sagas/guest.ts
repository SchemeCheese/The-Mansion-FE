import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GuestEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  createGuest,
  createGuestSuccess,
  logOut,
  removeGuestAction,
  removeGuestSuccessAction,
  setMainGuestAction,
  setMainGuestSuccessAction,
  updateGuestAction,
  updateGuestSuccessAction,
} from 'actions';

export function* postCreateGuestSaga({ payload }: ReturnType<typeof createGuest>) {
  try {
    let success = '';

    ({ success } = yield call(request, apiEndPoint(GuestEndpoint.CREATE), {
      method: 'POST',
      headers: headerWithAuthorization(),
      body: {
        ...payload.payload,
      },
    }));

    if (success) {
      yield put(createGuestSuccess());
    } else {
      message.error('Create Guest Failed!');
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Create Guest Failed!');
    }
  }
}

export function* postUpdateGuestSaga({ payload }: ReturnType<typeof updateGuestAction>) {
  try {
    let success = '';

    ({ success } = yield call(
      request,
      `${apiEndPoint(GuestEndpoint.UPDATE)}/${payload.payload.guest_id}/update`,
      {
        method: 'POST',
        headers: headerWithAuthorization(),
        body: {
          ...payload.payload,
        },
      },
    ));

    if (success) {
      yield put(updateGuestSuccessAction());
    } else {
      message.error('Update Guest Failed!');
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Update Guest Failed!');
    }
  }
}

export function* deleteRemoveGuestSaga({ payload }: ReturnType<typeof removeGuestAction>) {
  try {
    let success = '';

    ({ success } = yield call(
      request,
      `${apiEndPoint(GuestEndpoint.REMOVE)}/${payload.payload.reservation_detail_id}/guests/${
        payload.payload.guest_id
      }/remove`,
      {
        method: 'DELETE',
        headers: headerWithAuthorization(),
      },
    ));

    if (success) {
      yield put(removeGuestSuccessAction());
    } else {
      message.error('Remove Guest Failed!');
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Remove Guest Failed!');
    }
  }
}

export function* getSetMainGuestSaga({ payload }: ReturnType<typeof setMainGuestAction>) {
  try {
    let success = '';

    ({ success } = yield call(
      request,
      `${apiEndPoint(GuestEndpoint.REMOVE)}/${payload.reservation_detail_id}/guests/${
        payload.guest_id
      }/set-main-guest`,
      {
        method: 'GET',
        headers: headerWithAuthorization(),
      },
    ));

    if (success) {
      yield put(setMainGuestSuccessAction());
    } else {
      message.error('Set Main Guest Failed!');
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Set Main Guest Failed!');
    }
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.GUEST_CREATE, postCreateGuestSaga)]);
  yield all([takeLatest(ActionTypes.GUEST_UPDATE, postUpdateGuestSaga)]);
  yield all([takeLatest(ActionTypes.GUEST_REMOVE, deleteRemoveGuestSaga)]);
  yield all([takeLatest(ActionTypes.SET_MAIN_GUEST, getSetMainGuestSaga)]);
}
