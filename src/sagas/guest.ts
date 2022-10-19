import { request } from '@gilbarbara/helpers';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GuestEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { createGuest, createGuestSuccess } from 'actions';

export function* postCreateGuestSaga({ payload }: ReturnType<typeof createGuest>) {
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
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.GUEST_CREATE, postCreateGuestSaga)]);
}
