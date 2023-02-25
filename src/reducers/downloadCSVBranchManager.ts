import { createReducer } from '@reduxjs/toolkit';

import { downloadCSVBranchManagerAction, downloadCSVBranchManagerFinishAction } from 'actions';

import { DownloadCSVBranchManagerState } from 'types';

export const downloadCSVBranchManagerState = {
  payload: {
    file_name: '',
    language: '',
    start_date: '',
    end_date: '',
    cate_id: '',
  },
  status: '',
};

export default {
  downloadCSVBranchManager: createReducer<DownloadCSVBranchManagerState>(
    downloadCSVBranchManagerState,
    builder => {
      builder
        .addCase(downloadCSVBranchManagerAction, (draft, { payload }) => {
          draft.payload = payload.payload;
          draft.status = 'INIT';
        })
        .addCase(downloadCSVBranchManagerFinishAction, draft => {
          draft.status = 'SUCCESS';
        });
    },
  ),
};
