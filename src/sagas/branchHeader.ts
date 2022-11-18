import { request } from '@gilbarbara/helpers';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GetBranchOfEmployeeEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { branchHeaderFinish } from 'actions';

export function* getBranchHeaderSaga() {
  let data = [];

  data = yield call(request, `${apiEndPoint(GetBranchOfEmployeeEndpoint.GET)}`, {
    method: 'GET',
    headers: headerWithAuthorization(),
  });

  yield put(branchHeaderFinish({ data }));
}

export default function* root() {
  yield all([takeLatest(ActionTypes.BRANCH_HEADER_GET, getBranchHeaderSaga)]);
}
