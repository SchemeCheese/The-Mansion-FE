import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ChannelEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  fetchChannelsAction,
  fetchChannelsSuccessAction,
  logOut,
  updateRoomAvailableAction,
  updateRoomAvailableSuccessAction,
} from 'actions';

export function* fetchChannelSaga({ payload }: ReturnType<typeof fetchChannelsAction>) {
  try {
    let channels = [];
    let dates = [];
    let websites = [];
    let rates = [];
    const payloadWithBranch = {
      ...payload,
      operator_code: 'the_mansion',
      branch_code: 'the_mansion',
      facility_code: 'hotel',
    };
    const query = new URLSearchParams(Object(payloadWithBranch)).toString();

    ({ channels, dates, rates, websites } = yield call(
      request,
      `${apiEndPoint(ChannelEndpoint.GET_LIST)}?${query}`,
      {
        method: 'GET',
        headers: headerWithAuthorization(),
      },
    ));

    yield put(fetchChannelsSuccessAction({ dates, channels, websites, rates }));
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Can not fetch channel info!');
    }
  }
}

export function* postUpdateRoomAvailableSaga({
  payload,
}: ReturnType<typeof updateRoomAvailableAction>) {
  try {
    let success = '';

    ({ success } = yield call(request, `${apiEndPoint(ChannelEndpoint.SET_ROOM_DATE)}`, {
      method: 'POST',
      headers: headerWithAuthorization(),
      body: payload.payload,
    }));

    if (success) {
      yield put(updateRoomAvailableSuccessAction());
    } else {
      message.error('Can not update room available!');
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Can not update room available!');
    }
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.CHANNEL_FETCH, fetchChannelSaga)]);
  yield all([takeLatest(ActionTypes.UPDATE_ROOM_AVAILABLE_NUMBER, postUpdateRoomAvailableSaga)]);
}
