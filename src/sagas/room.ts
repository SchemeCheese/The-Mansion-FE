import { request } from '@gilbarbara/helpers';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { RoomEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { getRoomTypeFinish, searchRoom, searchRoomFinish } from 'actions';

export function* getSearchRoomnSaga({ payload }: ReturnType<typeof searchRoom>) {
  let charges = [];
  let rates = [];
  let total = 0;

  const query = new URLSearchParams(Object(payload)).toString();

  ({ charges, rates, total } = yield call(request, `${apiEndPoint(RoomEndpoint.SEARCH)}?${query}`, {
    method: 'GET',
    headers: headerWithAuthorization(),
  }));

  yield put(
    searchRoomFinish({
      charges,
      total,
      rates,
    }),
  );
}

export function* getRoomTypeSaga() {
  let data = [];

  ({ data } = yield call(request, `${apiEndPoint(RoomEndpoint.SEARCH_TYPE)}`, {
    method: 'GET',
    headers: headerWithAuthorization(),
  }));

  yield put(
    getRoomTypeFinish({
      data,
    }),
  );
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.ROOM_SEARCH, getSearchRoomnSaga),
    takeLatest(ActionTypes.ROOM_TYPE_GET, getRoomTypeSaga),
  ]);
}
