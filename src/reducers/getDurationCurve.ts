import { createReducer } from '@reduxjs/toolkit';

import { getDurationCurveAction, getDurationCurveFinishAction } from 'actions';

import { GetDurationCurveState } from 'types';

export const getDurationCurveState = {
  status: '',
  data: [],
};

export default {
  getDurationCurve: createReducer<GetDurationCurveState>(getDurationCurveState, builder => {
    builder
      .addCase(getDurationCurveAction, draft => {
        draft.status = 'INIT';
      })
      .addCase(getDurationCurveFinishAction, (draft, { payload }) => {
        draft.status = 'SUCCESS';
        draft.data = payload.data;
      });
  }),
};
