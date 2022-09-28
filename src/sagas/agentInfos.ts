import { request } from '@gilbarbara/helpers';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { AgentInfoEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { getAgentInfosFinish } from 'actions';

export function* getAgentInfosSaga() {
  let data = [];
  const total = 0;

  ({ data } = yield call(request, `${apiEndPoint(AgentInfoEndpoint.GET_AGENT)}`, {
    method: 'GET',
    headers: headerWithAuthorization(),
  }));

  yield put(getAgentInfosFinish({ data, total }));
}

export default function* root() {
  yield all([takeLatest(ActionTypes.AGENT_INFOS_GET, getAgentInfosSaga)]);
}
