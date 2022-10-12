import { request } from '@gilbarbara/helpers';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ChannelEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { fetchChannelsSuccessAction } from 'actions';

export function* fetchChannelSaga() {
  let channels = [];
  let dates = [];

  ({ channels, dates } = yield call(request, `${apiEndPoint(ChannelEndpoint.GET_LIST)}`, {
    method: 'GET',
    headers: headerWithAuthorization(),
  }));

  yield put(fetchChannelsSuccessAction({ dates, channels }));
}

export default function* root() {
  yield all([takeLatest(ActionTypes.CHANNEL_FETCH, fetchChannelSaga)]);
}
