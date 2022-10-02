import { createReducer } from '@reduxjs/toolkit';

import { cancelReservationDetail, cancelReservationDetailSuccess } from 'actions';

import { CancelReservationDetailState } from 'types';

export const cancelReservationDetailState = {
  payload: {
    reservation_id: '',
    client_info_id: '',
    cancel_reason: '',
    cancel_type: '',
    reservation_detail_id: [],
  },
  status: '',
};

export default {
  cancelReservationDetail: createReducer<CancelReservationDetailState>(
    cancelReservationDetailState,
    builder => {
      builder
        .addCase(cancelReservationDetail, (draft, { payload }) => {
          draft.payload = payload.payload;
          draft.status = 'INIT';
        })
        .addCase(cancelReservationDetailSuccess, draft => {
          draft.status = 'SUCCESS';
        });
    },
  ),
};
