import { request } from '@gilbarbara/helpers';
import { message } from 'antd';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { FileEndpoint } from 'config';
import { ActionTypes } from 'literals';

import { uploadFileAction, uploadFileSuccessAction } from 'actions';

export function* postUploadFileSaga({ payload }: ReturnType<typeof uploadFileAction>) {
  try {
    let url = '';

    ({ url } = yield call(request, `${apiEndPoint(FileEndpoint.UPLOAD)}`, {
      method: 'POST',
      headers: {
        ...headerWithAuthorization(),
      },
      body: {
        file: payload.file,
      },
    }));

    yield put(uploadFileSuccessAction({ url }));
  } catch (error) {
    console.log('Error', error);
    message.error('Upload file error!');
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.FILE_UPLOAD, postUploadFileSaga)]);
}
