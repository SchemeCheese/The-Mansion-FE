import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { AgentInfoEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { getAgentInfosFinish, logOut } from 'actions';

export function* getAgentInfosSaga() {
  try {
    let data = [];
    const total = 0;

    ({ data } = yield call(request, `${apiEndPoint(AgentInfoEndpoint.GET_AGENT)}`, {
      method: 'GET',
      headers: headerWithAuthorization(),
    }));

    yield put(getAgentInfosFinish({ data, total }));
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      message.error('Can not get agent info!');
    }
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.AGENT_INFOS_GET, getAgentInfosSaga)]);
}
