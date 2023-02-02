import { createReducer } from '@reduxjs/toolkit';

import { getElectricYesterdayAction, getElectricYesterdayFinishAction } from 'actions';

import { GetElectricYesterdayState } from 'types';

export const getElectricYesterdayState = {
  status: '',
  totalMonth: 0,
  dayPass: 0,
  totalYesterday: 0,
  avgYesterday: 0,
  listData: [],
};

export default {
  getElectricYesterday: createReducer<GetElectricYesterdayState>(
    getElectricYesterdayState,
    builder => {
      builder
        .addCase(getElectricYesterdayAction, draft => {
          draft.status = 'INIT';
        })
        .addCase(getElectricYesterdayFinishAction, (draft, { payload }) => {
          draft.status = 'SUCCESS';
          draft.totalMonth = payload.totalMonth;
          draft.dayPass = payload.dayPass;
          draft.totalYesterday = payload.totalYesterday;
          draft.avgYesterday = payload.avgYesterday;
          draft.listData = payload.listData;
        });
    },
  ),
};
