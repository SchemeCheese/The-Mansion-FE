import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ChannelEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { fetchChannelsSuccessAction } from 'actions';

export function* fetchChannelSaga() {
  try {
    let channels = [];
    let dates = [];

    ({ channels, dates } = yield call(request, `${apiEndPoint(ChannelEndpoint.GET_LIST)}`, {
      method: 'GET',
      headers: headerWithAuthorization(),
    }));

    yield put(fetchChannelsSuccessAction({ dates, channels }));
  } catch (error) {
    console.log('Error', error);
    message.error('Something went wrong!');
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.CHANNEL_FETCH, fetchChannelSaga)]);
}
