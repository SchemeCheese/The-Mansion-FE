import { createReducer } from '@reduxjs/toolkit';

import { updateRate, updateRateSuccess } from 'actions';

import { UpdateRateState } from 'types';

export const updateRateState = {
  payload: {
    reservation_id: '',
    reservation_detail_id: '',
    charges: [],
  },
  status: '',
};

export default {
  updateRate: createReducer<UpdateRateState>(updateRateState, builder => {
    builder
      .addCase(updateRate, (draft, { payload }) => {
        draft.payload = payload.payload;
        draft.status = 'INIT';
      })
      .addCase(updateRateSuccess, draft => {
        draft.status = 'SUCCESS';
      });
  }),
};
