import { createReducer } from '@reduxjs/toolkit';

import { printDepositPDFReservationDetail, printDepositPDFReservationDetailSuccess } from 'actions';

import { PrintDepositPDFReservationDetailState } from 'types';

export const printDepositPDFReservationDetailState = {
  payload: {
    file_name: '',
    language: '',
    reservation_info_id: '',
    reservation_detail_id: '',
    payment_method: '',
  },
  status: '',
};

export default {
  printDepositPDFReservationDetail: createReducer<PrintDepositPDFReservationDetailState>(
    printDepositPDFReservationDetailState,
    builder => {
      builder
        .addCase(printDepositPDFReservationDetail, (draft, { payload }) => {
          draft.payload = payload.payload;
          draft.status = 'INIT';
        })
        .addCase(printDepositPDFReservationDetailSuccess, draft => {
          draft.status = 'SUCCESS';
        });
    },
  ),
};
