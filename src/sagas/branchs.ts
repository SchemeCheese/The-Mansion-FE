import { request } from '@gilbarbara/helpers';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GetAllBranchsEndpoint, GetFacilitiesByBranch } from 'config';
import { ActionTypes } from 'literals';

import { branchFacilites, branchFacilitesFinish, branchsFinish } from 'actions';

export function* getBranchsSaga() {
  let data = [];

  data = yield call(request, `${apiEndPoint(GetAllBranchsEndpoint.GET)}`, {
    method: 'GET',
    headers: headerWithAuthorization(),
  });

  yield put(branchsFinish({ data }));
}

export function* getBranchFacitiesSaga({ payload }: ReturnType<typeof branchFacilites>) {
  let data = [];

  data = yield call(request, `${apiEndPoint(GetFacilitiesByBranch.GET)}/${payload.branchId}`, {
    method: 'GET',
    headers: headerWithAuthorization(),
  });

  yield put(branchFacilitesFinish({ data }));
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.GET_BRANCH, getBranchsSaga),
    takeLatest(ActionTypes.GET_BRANCH_FACILITY, getBranchFacitiesSaga),
  ]);
}
