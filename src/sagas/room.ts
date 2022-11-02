import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { RoomEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { getRoomsActionFinish, getRoomTypeFinish, searchRoom, searchRoomFinish } from 'actions';

export function* getSearchRoomnSaga({ payload }: ReturnType<typeof searchRoom>) {
  try {
    let charges = [];
    let rates = [];
    let total = 0;
    const payloadWithBranch = {
      ...payload,
      operator_code: 'the_mansion',
      branch_code: 'the_mansion',
      facility_code: 'hotel',
    };

    const query = new URLSearchParams(Object(payloadWithBranch)).toString();

    ({ charges, rates, total } = yield call(
      request,
      `${apiEndPoint(RoomEndpoint.SEARCH)}?${query}`,
      {
        method: 'GET',
        headers: headerWithAuthorization(),
      },
    ));

    yield put(
      searchRoomFinish({
        charges,
        total,
        rates,
      }),
    );
  } catch (error) {
    console.log('Error', error);
    message.error('Cannot get room info!');
  }
}

export function* getRoomTypeSaga() {
  try {
    let data = [];
    const payload = {
      operator_code: 'the_mansion',
      branch_code: 'the_mansion',
      facility_code: 'hotel',
    };
    const query = new URLSearchParams(Object(payload)).toString();

    ({ data } = yield call(request, `${apiEndPoint(RoomEndpoint.SEARCH_TYPE)}?${query}`, {
      method: 'GET',
      headers: headerWithAuthorization(),
    }));

    yield put(
      getRoomTypeFinish({
        data,
      }),
    );
  } catch (error) {
    console.log('Error', error);
    message.error('Something went wrong!');
  }
}

export function* getRoomsSaga() {
  try {
    let items = [];
    const payload = {
      operator_code: 'the_mansion',
      branch_code: 'the_mansion',
      facility_code: 'hotel',
    };

    const query = new URLSearchParams(Object(payload)).toString();

    ({ items } = yield call(request, `${apiEndPoint(RoomEndpoint.GET_ROOM)}?${query}`, {
      method: 'GET',
      headers: headerWithAuthorization(),
    }));

    yield put(
      getRoomsActionFinish({
        items,
      }),
    );
  } catch (error) {
    console.log('Error', error);
    message.error('Cannot get rooms!');
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.ROOM_SEARCH, getSearchRoomnSaga),
    takeLatest(ActionTypes.ROOM_TYPE_GET, getRoomTypeSaga),
    takeLatest(ActionTypes.GET_ROOMS, getRoomsSaga),
  ]);
}
