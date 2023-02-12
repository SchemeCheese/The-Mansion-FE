import { createReducer } from '@reduxjs/toolkit';

import { getElectricAreaAction, getElectricAreaFinishAction } from 'actions';

import { GetElectricAreaState } from 'types';

export const getElectricAreaState = {
  status: '',
  data: [],
};

export default {
  getElectricArea: createReducer<GetElectricAreaState>(getElectricAreaState, builder => {
    builder
      .addCase(getElectricAreaAction, draft => {
        draft.status = 'INIT';
      })
      .addCase(getElectricAreaFinishAction, (draft, { payload }) => {
        draft.status = 'SUCCESS';
        draft.data = payload.data;
      });
  }),
};
