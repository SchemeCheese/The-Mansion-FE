import { createReducer } from '@reduxjs/toolkit';

import { downloadDocxReservationDetail, downloadDocxReservationDetailSuccess } from 'actions';

import { DownloadDocxReservationDetailState } from 'types';

export const downloadDocxReservationDetailState = {
  payload: {
    language: '',
    reservation_info_id: '',
    file_name: '',
  },
  status: '',
};

export default {
  downloadDocxReservationDetail: createReducer<DownloadDocxReservationDetailState>(
    downloadDocxReservationDetailState,
    builder => {
      builder
        .addCase(downloadDocxReservationDetail, (draft, { payload }) => {
          draft.payload = payload.payload;
          draft.status = 'INIT';
        })
        .addCase(downloadDocxReservationDetailSuccess, draft => {
          draft.status = 'SUCCESS';
        });
    },
  ),
};
