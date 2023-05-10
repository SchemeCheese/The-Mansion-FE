import { createReducer } from '@reduxjs/toolkit';

import {
  printCheckinConfirmPDFReservationDetail,
  printCheckinConfirmPDFReservationDetailSuccess,
} from 'actions';

import { PrintCheckinConfirmPDFReservationDetailState } from 'types';

export const printCheckinConfirmPDFReservationDetailState = {
  payload: {
    file_name: '',
    language: '',
    reservation_info_id: '',
    reservation_detail_ids: [],
    hide_room_rate: '',
  },
  status: '',
};

export default {
  printCheckinConfirmPDFReservationDetail:
    createReducer<PrintCheckinConfirmPDFReservationDetailState>(
      printCheckinConfirmPDFReservationDetailState,
      builder => {
        builder
          .addCase(printCheckinConfirmPDFReservationDetail, (draft, { payload }) => {
            draft.payload = payload.payload;
            draft.status = 'INIT';
          })
          .addCase(printCheckinConfirmPDFReservationDetailSuccess, draft => {
            draft.status = 'SUCCESS';
          });
      },
    ),
};
