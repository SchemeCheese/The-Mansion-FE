import { createReducer } from '@reduxjs/toolkit';

import { uploadFileAction, uploadFileSuccessAction } from 'actions';

import { UploadFileState } from 'types';

export const uploadFileState = {
  file: null,
  url: '',
  status: '',
};

export default {
  uploadFile: createReducer<UploadFileState>(uploadFileState, builder => {
    builder
      .addCase(uploadFileAction, (draft, { payload }) => {
        draft.file = payload.file;
        draft.status = 'INIT';
      })
      .addCase(uploadFileSuccessAction, (draft, { payload }) => {
        draft.url = payload.url;
        draft.status = 'SUCCESS';
      });
  }),
};
