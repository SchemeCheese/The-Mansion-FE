import { request } from '@gilbarbara/helpers';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { RoomEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { searchRoom, searchRoomFinish } from 'actions';

export function* getSearchRoomnSaga({ payload }: ReturnType<typeof searchRoom>) {
  let charges = [];
  let rates = [];
  let total = 0;
  const additionalPayload = {
    ...payload,
    source_type: 1,
    source_id: 2,
  };

  const query = new URLSearchParams(Object(additionalPayload)).toString();

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

export default function* root() {
  yield all([takeLatest(ActionTypes.ROOM_SEARCH, getSearchRoomnSaga)]);
}
