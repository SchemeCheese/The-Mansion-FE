import { createReducer } from '@reduxjs/toolkit';

import { downloadPDFReservationDetail, downloadPDFReservationDetailSuccess } from 'actions';

import { DownloadPDFReservationDetailState } from 'types';

export const downloadPDFReservationDetailState = {
  payload: {
    language: '',
    reservation_info_id: '',
    file_name: '',
  },
  status: '',
};

export default {
  downloadPDFReservationDetail: createReducer<DownloadPDFReservationDetailState>(
    downloadPDFReservationDetailState,
    builder => {
      builder
        .addCase(downloadPDFReservationDetail, (draft, { payload }) => {
          draft.payload = payload.payload;
          draft.status = 'INIT';
        })
        .addCase(downloadPDFReservationDetailSuccess, draft => {
          draft.status = 'SUCCESS';
        });
    },
  ),
};
