import { createReducer } from '@reduxjs/toolkit';

import { addReservationDetail, addReservationDetailSuccess } from 'actions';

import { AddReservationDetailState } from 'types';

export const addReservationDetailState = {
  payload: {
    client_info_id: '',
    reservation_id: '',
    rooms: [],
  },
  status: '',
};

export default {
  addReservationDetail: createReducer<AddReservationDetailState>(
    addReservationDetailState,
    builder => {
      builder
        .addCase(addReservationDetail, (draft, { payload }) => {
          draft.payload = payload.payload;
          draft.status = 'INIT';
        })
        .addCase(addReservationDetailSuccess, draft => {
          draft.status = 'SUCCESS';
        });
    },
  ),
};
