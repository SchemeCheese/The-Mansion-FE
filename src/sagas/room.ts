import { request } from '@gilbarbara/helpers';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { RoomEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { searchRoom, searchRoomFinish } from 'actions';

export function* getSearchRoomnSaga({ payload }: ReturnType<typeof searchRoom>) {
  let charges = [];
  let total = 0;

  console.log(payload);

  // const query = new URLSearchParams(Object(payload)).toString();

  ({ charges, total } = yield call(request, `${apiEndPoint(RoomEndpoint.SEARCH)}?room_type=1`, {
    method: 'GET',
    headers: headerWithAuthorization(),
  }));

  yield put(
    searchRoomFinish({
      charges,
      total,
    }),
  );
}

export default function* root() {
  yield all([takeLatest(ActionTypes.ROOM_SEARCH, getSearchRoomnSaga)]);
}
