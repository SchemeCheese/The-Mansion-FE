import { now, request } from '@gilbarbara/helpers';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { hasValidCache } from 'modules/helpers';

import { GetAllBranchsEndpoint, GetFacilitiesByBranch } from 'config';
import { ActionTypes } from 'literals';

import {
  branchFacilites,
  branchFacilitesFinish,
  branchSelected,
  branchsFinish,
  getFacilityAction,
  getFacilityFinishAction,
} from 'actions';

export function* getBranchsSaga(): any {
  let data: any = [];

  data = yield call(request, `${apiEndPoint(GetAllBranchsEndpoint.GET)}`, {
    method: 'GET',
    headers: headerWithAuthorization(),
  });

  yield put(branchsFinish({ data }));
}

export function* getBranchFacitiesSaga({ payload }: ReturnType<typeof branchFacilites>): any {
  let data: any = [];

  data = yield call(request, `${apiEndPoint(GetFacilitiesByBranch.GET)}/${payload.branchId}`, {
    method: 'GET',
    headers: headerWithAuthorization(),
  });

  yield put(branchFacilitesFinish({ data }));
}

export function* getFacilitySaga({ payload }: ReturnType<typeof getFacilityAction>): any {
  let data: any = [];

  data = yield call(
    request,
    `${apiEndPoint(GetFacilitiesByBranch.GET_FACILITY_DETAIL)}/${payload.facility_id}`,
    {
      method: 'GET',
      headers: headerWithAuthorization(),
    },
  );

  yield put(getFacilityFinishAction({ data }));
  yield put(branchSelected(data));
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.GET_BRANCH, getBranchsSaga),
    takeLatest(ActionTypes.GET_BRANCH_FACILITY, getBranchFacitiesSaga),
    takeLatest(ActionTypes.GET_FACILITY, getFacilitySaga),
  ]);
}
