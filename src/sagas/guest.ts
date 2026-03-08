import { request } from '@gilbarbara/helpers';

import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { GuestEndpoint } from 'config';
import { ActionTypes } from 'literals';

import {
  createGuest,
  createGuestSuccess,
  getReservationCheckoutByRoomNoAction,
  getReservationCheckoutByRoomNoActionSuccess,
  getReservationGuestCheckinAction,
  getReservationGuestCheckinSuccessAction,
  logOut,
  removeGuestAction,
  removeGuestSuccessAction,
  setMainGuestAction,
  setMainGuestSuccessAction,
  updateGuestAction,
  updateGuestSuccessAction,
} from 'actions';
import { notify } from 'ui/notification';

export function* deleteRemoveGuestSaga({ payload }: ReturnType<typeof removeGuestAction>) {
  try {
    let success = '';
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});
    const payloadBranch = {
      operator_code,
      branch_code,
      facility_code,
    };
    const query = new URLSearchParams(Object(payloadBranch)).toString();

    ({ success } = yield call(
      request,
      `${apiEndPoint(GuestEndpoint.REMOVE)}/${payload.payload.reservation_detail_id}/guests/${
        payload.payload.guest_id
      }/remove?${query}`,
      {
        method: 'DELETE',
        headers: headerWithAuthorization(),
      },
    ));

    if (success) {
      yield put(removeGuestSuccessAction());
    } else {
      notify.error('Remove Guest Failed!');
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      notify.error('Remove Guest Failed!');
    }
  }
}

export function* getReservationCheckoutByRoomNoSaga({
  payload,
}: ReturnType<typeof getReservationCheckoutByRoomNoAction>) {
  try {
    let success = '';
    let data = {};
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

    ({ data, success } = yield call(
      request,
      `${apiEndPoint(GuestEndpoint.GET_RESERVATION_CHECKOUT_BY_ROOM_NO)}/${
        payload.room_no
      }?branch_code=${branch_code}&operator_code=${operator_code}&facility_code=${facility_code}`,
      {
        method: 'GET',
        headers: headerWithAuthorization(),
      },
    ));

    if (success) {
      yield put(getReservationCheckoutByRoomNoActionSuccess({ data }));
    } else {
      notify.warn('The room has no checkout today reservation');
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else if (error.status === 422) {
      notify.warn('The room has no checkout today reservation');
    } else {
      notify.error('Get Reservation Info Failed!');
    }
  }
}

export function* getReservationGuestCheckinSaga({
  payload,
}: ReturnType<typeof getReservationGuestCheckinAction>) {
  try {
    let success = '';
    let data = {};
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});

    ({ data, success } = yield call(
      request,
      `${apiEndPoint(GuestEndpoint.GET_RESERVATION_GUEST_CHECKIN)}/${
        payload.reservation_info_id
      }/reservation-detail/${
        payload.reservation_detail_id
      }/show?branch_code=${branch_code}&operator_code=${operator_code}&facility_code=${facility_code}`,
      {
        method: 'GET',
        headers: headerWithAuthorization(),
      },
    ));

    if (success) {
      yield put(getReservationGuestCheckinSuccessAction({ data }));
    } else {
      notify.warn('The room has no checkin today reservation');
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else if (error.status === 422) {
      notify.warn('The room has no checkin today reservation');
    } else {
      notify.error('Get Reservation Info Failed!');
    }
  }
}

export function* getSetMainGuestSaga({ payload }: ReturnType<typeof setMainGuestAction>) {
  try {
    let success = '';
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});
    const payloadBranch = {
      operator_code,
      branch_code,
      facility_code,
    };

    ({ success } = yield call(
      request,
      `${apiEndPoint(GuestEndpoint.REMOVE)}/${payload.reservation_detail_id}/guests/${
        payload.guest_id
      }/set-main-guest`,
      {
        method: 'POST',
        headers: headerWithAuthorization(),
        body: payloadBranch,
      },
    ));

    if (success) {
      yield put(setMainGuestSuccessAction());
    } else {
      notify.error('Set Main Guest Failed!');
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      notify.error('Set Main Guest Failed!');
    }
  }
}

export function* postCreateGuestSaga({ payload }: ReturnType<typeof createGuest>) {
  try {
    let success = '';
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});
    const payloadBranch = {
      operator_code,
      branch_code,
      facility_code,
    };

    ({ success } = yield call(request, apiEndPoint(GuestEndpoint.CREATE), {
      method: 'POST',
      headers: headerWithAuthorization(),
      body: {
        ...payload.payload,
        ...payloadBranch,
      },
    }));

    if (success) {
      yield put(createGuestSuccess());
    } else {
      notify.error('Create Guest Failed!');
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      notify.error('Create Guest Failed!');
    }
  }
}

export function* postUpdateGuestSaga({ payload }: ReturnType<typeof updateGuestAction>) {
  try {
    let success = '';
    const { branch_code, facility_code, operator_code } = yield select(s => s.branchInfo || {});
    const payloadBranch = {
      operator_code,
      branch_code,
      facility_code,
    };

    ({ success } = yield call(
      request,
      `${apiEndPoint(GuestEndpoint.UPDATE)}/${payload.payload.guest_id}/update`,
      {
        method: 'POST',
        headers: headerWithAuthorization(),
        body: {
          ...payload.payload,
          ...payloadBranch,
        },
      },
    ));

    if (success) {
      yield put(updateGuestSuccessAction());
    } else {
      notify.error('Update Guest Failed!');
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error);
    }

    if (error.status === 401) {
      yield put(logOut());
    } else {
      notify.error('Update Guest Failed!');
    }
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.GUEST_CREATE, postCreateGuestSaga)]);
  yield all([takeLatest(ActionTypes.GUEST_UPDATE, postUpdateGuestSaga)]);
  yield all([takeLatest(ActionTypes.GUEST_REMOVE, deleteRemoveGuestSaga)]);
  yield all([takeLatest(ActionTypes.SET_MAIN_GUEST, getSetMainGuestSaga)]);
  yield all([
    takeLatest(ActionTypes.GET_RESERVATION_DETAIL_BY_ROOM_NO, getReservationCheckoutByRoomNoSaga),
  ]);
  yield all([takeLatest(ActionTypes.GET_RESERVATION_CHECKIN, getReservationGuestCheckinSaga)]);
}
