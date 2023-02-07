import { createReducer } from '@reduxjs/toolkit';

import { getWaterYesterdayAction, getWaterYesterdayFinishAction } from 'actions';

import { GetWaterYesterdayState } from 'types';

export const getWaterYesterdayState = {
  status: '',
  totalMonth: 0,
  dayPass: 0,
  totalYesterday: 0,
  avgYesterday: 0,
  listData: [],
};

export default {
  getWaterYesterday: createReducer<GetWaterYesterdayState>(getWaterYesterdayState, builder => {
    builder
      .addCase(getWaterYesterdayAction, draft => {
        draft.status = 'INIT';
      })
      .addCase(getWaterYesterdayFinishAction, (draft, { payload }) => {
        draft.status = 'SUCCESS';
        draft.totalMonth = payload.totalMonth;
        draft.dayPass = payload.dayPass;
        draft.totalYesterday = payload.totalYesterday;
        draft.avgYesterday = payload.avgYesterday;
        draft.listData = payload.listData;
      });
  }),
};
