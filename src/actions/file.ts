import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { FileUpload, FileUploadSuccess } from 'types';

export const uploadFileAction = createAction(ActionTypes.FILE_UPLOAD, (payload: FileUpload) =>
  actionPayload(payload),
);

export const uploadFileSuccessAction = createAction(
  ActionTypes.FILE_UPLOAD_SUCCESS,
  (payload: FileUploadSuccess) => actionPayload(payload),
);
