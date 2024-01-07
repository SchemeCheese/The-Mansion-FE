import { createReducer } from '@reduxjs/toolkit';

import { updatePaymentDetail, updatePaymentDetailSuccess } from 'actions';

import { UpdatePaymentDetailState } from 'types';

export const updatePaymentDetailState = {
  payload: {
    payment_detail_id: '',
    files: [],
    vcc_status: '',
  },
  status: '',
};

export default {
  updatePaymentDetail: createReducer<UpdatePaymentDetailState>(
    updatePaymentDetailState,
    builder => {
      builder
        .addCase(updatePaymentDetail, (draft, { payload }) => {
          draft.payload = payload.payload;
          draft.status = 'INIT';
        })
        .addCase(updatePaymentDetailSuccess, draft => {
          draft.status = 'SUCCESS';
        });
    },
  ),
};
