import { createReducer } from '@reduxjs/toolkit';

import { copyReservationAction, copyReservationActionSuccess } from 'actions';

import { CopyReservationState } from 'types';

export const copyReservationState = {
  status: '',
  reservation_id: '',
  new_reservation_id: '',
};

export default {
  copyReservation: createReducer<CopyReservationState>(copyReservationState, builder => {
    builder
      .addCase(copyReservationAction, (draft, { payload }) => {
        draft.status = 'INIT';
        draft.reservation_id = payload.reservation_id;
      })
      .addCase(copyReservationActionSuccess, (draft, { payload }) => {
        draft.status = 'SUCCESS';
        draft.new_reservation_id = payload.new_reservation_id;
      });
  }),
};
