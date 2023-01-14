import { createReducer } from '@reduxjs/toolkit';

import { fetchFuelInfoAction, fetchFuelInfoFinishAction } from 'actions';

import { FuelState } from 'types';

export const fuelState = {
  payload: {
    type: '',
  },
  status: '',
  water: [],
  electric: [],
};

export default {
  fuel: createReducer<FuelState>(fuelState, builder => {
    builder
      .addCase(fetchFuelInfoAction, (draft, { payload }) => {
        draft.payload = payload;
        draft.status = 'INIT';
      })
      .addCase(fetchFuelInfoFinishAction, (draft, { payload }) => {
        draft.status = 'SUCCESS';
        draft.water = payload.water;
        draft.electric = payload.electric;
      });
  }),
};
