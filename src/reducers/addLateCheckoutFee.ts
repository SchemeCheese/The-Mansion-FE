import { createReducer } from '@reduxjs/toolkit';

import { addLateCheckoutFeeAction, addLateCheckoutFeeSuccessAction } from 'actions';

import { AddLateCheckoutFeeState } from 'types';

export const addLateCheckoutFeeState = {
  payload: {
    reservation_id: '',
    reservation_detail: [],
  },
  status: '',
};

export default {
  addLateCheckoutFee: createReducer<AddLateCheckoutFeeState>(addLateCheckoutFeeState, builder => {
    builder
      .addCase(addLateCheckoutFeeAction, (draft, { payload }) => {
        draft.payload = payload.payload;
        draft.status = 'INIT';
      })
      .addCase(addLateCheckoutFeeSuccessAction, draft => {
        draft.status = 'SUCCESS';
      });
  }),
};
