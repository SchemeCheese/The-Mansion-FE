import { createReducer } from '@reduxjs/toolkit';

import { getWaterAreaAction, getWaterAreaFinishAction } from 'actions';

import { GetWaterAreaState } from 'types';

export const getWaterAreaState = {
  status: '',
  data: [],
};

export default {
  getWaterArea: createReducer<GetWaterAreaState>(getWaterAreaState, builder => {
    builder
      .addCase(getWaterAreaAction, draft => {
        draft.status = 'INIT';
      })
      .addCase(getWaterAreaFinishAction, (draft, { payload }) => {
        draft.status = 'SUCCESS';
        draft.data = payload.data;
      });
  }),
};
