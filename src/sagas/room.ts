import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { RoomEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  getRoomsActionFinish,
  getRoomTypeFinish,
  logOut,
  searchRoom,
  searchRoomFinish,
} from 'actions';

export function* getSearchRoomnSaga({ payload }: ReturnType<typeof searchRoom>) {
  try {
    let charges = [];
    let rates = [];
    let total = 0;
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});
    const payloadWithBranch = {
      ...payload,
      operator_code,
      branch_code,
      facility_code,
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

    if (total === 0) {
      message.warning('No more rooms available!');
    }

    yield put(
      searchRoomFinish({
        charges,
        total,
        rates,
      }),
    );
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Cannot get room info!');
    }
  }
}

export function* getRoomTypeSaga() {
  try {
    let data = [];
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

    const payload = {
      operator_code,
      branch_code,
      facility_code,
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
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Cannot get room type!');
    }
  }
}

export function* getRoomsSaga() {
  try {
    let items = [];
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

    const payload = {
      operator_code,
      branch_code,
      facility_code,
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
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Cannot get rooms!');
    }
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.ROOM_SEARCH, getSearchRoomnSaga),
    takeLatest(ActionTypes.ROOM_TYPE_GET, getRoomTypeSaga),
    takeLatest(ActionTypes.GET_ROOMS, getRoomsSaga),
  ]);
}
