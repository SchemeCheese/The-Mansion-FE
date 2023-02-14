import { createReducer } from '@reduxjs/toolkit';

import { getElectricPowerAction, getElectricPowerFinishAction } from 'actions';

import { GetElectricPowerState } from 'types';

export const getElectricPowerState = {
  status: '',
  data: [],
};

export default {
  getElectricPower: createReducer<GetElectricPowerState>(getElectricPowerState, builder => {
    builder
      .addCase(getElectricPowerAction, draft => {
        draft.status = 'INIT';
      })
      .addCase(getElectricPowerFinishAction, (draft, { payload }) => {
        draft.status = 'SUCCESS';
        draft.data = payload.data;
      });
  }),
};
