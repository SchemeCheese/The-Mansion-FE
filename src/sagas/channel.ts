import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ChannelEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  fetchChannelsAction,
  fetchChannelsSuccessAction,
  updateRoomAvailableAction,
  updateRoomAvailableSuccessAction,
} from 'actions';

export function* fetchChannelSaga({ payload }: ReturnType<typeof fetchChannelsAction>) {
  try {
    let channels = [];
    let dates = [];
    let websites = [];
    let rates = [];
    const query = new URLSearchParams(Object(payload)).toString();

    ({ channels, dates, rates, websites } = yield call(
      request,
      `${apiEndPoint(ChannelEndpoint.GET_LIST)}?${query}`,
      {
        method: 'GET',
        headers: headerWithAuthorization(),
      },
    ));

    yield put(fetchChannelsSuccessAction({ dates, channels, websites, rates }));
  } catch (error) {
    console.log('Error', error);
    message.error('Something went wrong!');
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
  } catch (error) {
    console.log('Error', error);
    message.error('Can not update room available!');
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.CHANNEL_FETCH, fetchChannelSaga)]);
  yield all([takeLatest(ActionTypes.UPDATE_ROOM_AVAILABLE_NUMBER, postUpdateRoomAvailableSaga)]);
}
