import { createReducer } from '@reduxjs/toolkit';

import { downloadPDFInvoiceTransaction, downloadPDFInvoiceTransactionSuccess } from 'actions';

import { DownloadPDFInvoiceTransactionState } from 'types';

export const downloadPDFInvoiceTransactionState = {
  payload: {
    reservation_detail_id: '',
    reservation_info_id: '',
    file_name: '',
    language: '',
    payment_id: 0,
  },
  status: '',
};

export default {
  downloadPDFInvoiceTransaction: createReducer<DownloadPDFInvoiceTransactionState>(
    downloadPDFInvoiceTransactionState,
    builder => {
      builder
        .addCase(downloadPDFInvoiceTransaction, (draft, { payload }) => {
          draft.payload = payload.payload;
          draft.status = 'INIT';
        })
        .addCase(downloadPDFInvoiceTransactionSuccess, draft => {
          draft.status = 'SUCCESS';
        });
    },
  ),
};
