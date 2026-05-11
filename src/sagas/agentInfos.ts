import { now, request } from '@gilbarbara/helpers';

import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { hasValidCache } from 'modules/helpers';

import { AgentInfoEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { getAgentInfosFinish, logOut } from 'actions';
import { notify } from 'ui/notification';

export function* getAgentInfosSaga() {
  try {
    const total = 0;
    const { cached = false, updatedAt = 0 } = yield select(s => s.agentInfos || {});
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});
    const hasCache = cached && hasValidCache(updatedAt);

    if (!branch_code || !facility_code || !operator_code) {
      yield put(getAgentInfosFinish({ data: [], total, updatedAt: now() }));

      return;
    }

    if (!hasCache) {
      let data = [];
      const query = new URLSearchParams({
        operator_code: operator_code || '',
        branch_code: branch_code || '',
        facility_code: facility_code || '',
      }).toString();

      ({ data } = yield call(request, `${apiEndPoint(AgentInfoEndpoint.GET_AGENT)}?${query}`, {
        method: 'GET',
        headers: headerWithAuthorization(),
      }));

      yield put(getAgentInfosFinish({ data, total, updatedAt: now() }));
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      notify.error('Can not get agent info!');
    }
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.AGENT_INFOS_GET, getAgentInfosSaga)]);
}
