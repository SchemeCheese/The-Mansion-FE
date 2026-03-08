import { request } from '@gilbarbara/helpers';

import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { RoomEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  getReservationRoomCheckinTodayAction,
  getReservationRoomCheckinTodayActionFinish,
  getReservationRoomCheckoutTodayAction,
  getReservationRoomCheckoutTodayActionFinish,
  getReservationRoomInhouseAction,
  getReservationRoomInhouseActionFinish,
  getRoomOptionFinish,
  getRoomsActionFinish,
  getRoomTypeFinish,
  getWalkinRoomsAction,
  getWalkinRoomsActionFinish,
  logOut,
  searchRoom,
  searchRoomFinish,
} from 'actions';
import { notify } from 'ui/notification';

export function* getReservationRoomCheckinTodaySaga({
  payload,
}: ReturnType<typeof getReservationRoomCheckinTodayAction>) {
  try {
    let items = [];
    let total = 0;
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});
    const newPayload = {
      ...payload.filter,
      operator_code,
      branch_code,
      facility_code,
      type: 'noshow_today',
    };
    const query = new URLSearchParams(Object(newPayload)).toString();

    ({ items, total } = yield call(
      request,
      `${apiEndPoint(RoomEndpoint.GET_RESERVATION_ROOM)}?${query}`,
      {
        method: 'GET',
        headers: headerWithAuthorization(),
      },
    ));

    yield put(
      getReservationRoomCheckinTodayActionFinish({
        data: {
          items,
        },
        total,
      }),
    );
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      notify.error('Cannot get rooms!');
    }
  }
}

export function* getReservationRoomCheckoutTodaySaga({
  payload,
}: ReturnType<typeof getReservationRoomCheckoutTodayAction>) {
  try {
    let items = [];
    let total = 0;
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});
    const newPayload = {
      ...payload.filter,
      operator_code,
      branch_code,
      facility_code,
      type: 'checkout_today',
    };
    const query = new URLSearchParams(Object(newPayload)).toString();

    ({ items, total } = yield call(
      request,
      `${apiEndPoint(RoomEndpoint.GET_RESERVATION_ROOM)}?${query}`,
      {
        method: 'GET',
        headers: headerWithAuthorization(),
      },
    ));

    yield put(
      getReservationRoomCheckoutTodayActionFinish({
        data: {
          items,
        },
        total,
      }),
    );
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      notify.error('Cannot get rooms!');
    }
  }
}

export function* getReservationRoomInhouseSaga({
  payload,
}: ReturnType<typeof getReservationRoomInhouseAction>) {
  try {
    let items = [];
    let total = 0;
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});
    const newPayload = {
      ...payload.filter,
      operator_code,
      branch_code,
      facility_code,
      type: 'inhouse_today',
    };
    const query = new URLSearchParams(Object(newPayload)).toString();

    ({ items, total } = yield call(
      request,
      `${apiEndPoint(RoomEndpoint.GET_RESERVATION_ROOM)}?${query}`,
      {
        method: 'GET',
        headers: headerWithAuthorization(),
      },
    ));

    yield put(
      getReservationRoomInhouseActionFinish({
        data: {
          items,
        },
        total,
      }),
    );
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      notify.error('Cannot get rooms!');
    }
  }
}

export function* getRoomOptionSaga() {
  try {
    let data = [];
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

    const payload = {
      operator_code,
      branch_code,
      facility_code,
    };
    const query = new URLSearchParams(Object(payload)).toString();

    ({ data } = yield call(request, `${apiEndPoint(RoomEndpoint.SEARCH_OPTION)}?${query}`, {
      method: 'GET',
      headers: headerWithAuthorization(),
    }));

    yield put(
      getRoomOptionFinish({
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
      notify.error('Cannot get room option!');
    }
  }
}

export function* getRoomsSaga() {
  try {
    let items = [];
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

    let total = 0;
    const payload = {
      operator_code,
      branch_code,
      facility_code,
    };

    const query = new URLSearchParams(Object(payload)).toString();

    ({ items, total } = yield call(request, `${apiEndPoint(RoomEndpoint.GET_ROOM)}?${query}`, {
      method: 'GET',
      headers: headerWithAuthorization(),
    }));

    yield put(
      getRoomsActionFinish({
        items,
        total,
      }),
    );
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      notify.error('Cannot get rooms!');
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
      notify.error('Cannot get room type!');
    }
  }
}

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
      notify.warning('No more rooms available!');
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
      notify.error('Cannot get room info!');
    }
  }
}

export function* getWalkinRoomsSaga({ payload }: ReturnType<typeof getWalkinRoomsAction>) {
  try {
    let items = [];
    let total = 0;
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});
    const newPayload = {
      ...payload,
      operator_code,
      branch_code,
      facility_code,
      per_page: 9,
    };

    const query = new URLSearchParams(Object(newPayload)).toString();

    ({ items, total } = yield call(request, `${apiEndPoint(RoomEndpoint.GET_ROOM)}?${query}`, {
      method: 'GET',
      headers: headerWithAuthorization(),
    }));

    yield put(
      getWalkinRoomsActionFinish({
        items,
        total,
      }),
    );
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      notify.error('Cannot get rooms!');
    }
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.ROOM_SEARCH, getSearchRoomnSaga),
    takeLatest(ActionTypes.ROOM_TYPE_GET, getRoomTypeSaga),
    takeLatest(ActionTypes.ROOM_OPTION_GET, getRoomOptionSaga),
    takeLatest(ActionTypes.GET_ROOMS, getRoomsSaga),
    takeLatest(ActionTypes.GET_WALKIN_ROOMS, getWalkinRoomsSaga),
    takeLatest(ActionTypes.GET_RESERVATION_ROOM_INHOUSE, getReservationRoomInhouseSaga),
    takeLatest(
      ActionTypes.GET_RESERVATION_ROOM_CHECKOUT_TODAY,
      getReservationRoomCheckoutTodaySaga,
    ),
    takeLatest(ActionTypes.GET_RESERVATION_ROOM_CHECKIN_TODAY, getReservationRoomCheckinTodaySaga),
  ]);
}
