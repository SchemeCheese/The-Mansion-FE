import { createReducer } from '@reduxjs/toolkit';

import { updateNoteReservationDetail, updateNoteReservationDetailSuccess } from 'actions';

import { UpdateNoteReservationDetailState } from 'types';

export const updateNoteReservationDetailState = {
  payload: {
    reservation_detail_id: '',
    reservation_info_id: '',
    note: '',
  },
  status: '',
};

export default {
  updateNoteReservationDetail: createReducer<UpdateNoteReservationDetailState>(
    updateNoteReservationDetailState,
    builder => {
      builder
        .addCase(updateNoteReservationDetail, (draft, { payload }) => {
          draft.payload = payload.payload;
          draft.status = 'INIT';
        })
        .addCase(updateNoteReservationDetailSuccess, draft => {
          draft.status = 'SUCCESS';
        });
    },
  ),
};
