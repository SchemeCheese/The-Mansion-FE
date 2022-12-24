import { createReducer } from '@reduxjs/toolkit';

import {
  printRegistrationCardPDFReservationDetail,
  printRegistrationCardPDFReservationDetailSuccess,
} from 'actions';

import { PrintRegistrationCardPDFReservationDetailState } from 'types';

export const printRegistrationCardPDFReservationDetailState = {
  payload: {
    file_name: '',
    language: '',
    reservation_info_id: '',
    reservation_detail_id: '',
  },
  status: '',
};

export default {
  printRegistrationCardPDFReservationDetail:
    createReducer<PrintRegistrationCardPDFReservationDetailState>(
      printRegistrationCardPDFReservationDetailState,
      builder => {
        builder
          .addCase(printRegistrationCardPDFReservationDetail, (draft, { payload }) => {
            draft.payload = payload.payload;
            draft.status = 'INIT';
          })
          .addCase(printRegistrationCardPDFReservationDetailSuccess, draft => {
            draft.status = 'SUCCESS';
          });
      },
    ),
};
