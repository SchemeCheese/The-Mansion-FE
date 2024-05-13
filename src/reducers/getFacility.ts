import { createReducer } from '@reduxjs/toolkit';

import { getFacilityAction, getFacilityFinishAction } from 'actions';

import { GetFacilityState } from 'types';

export const getFacilityState = {
  status: '',
  data: {},
};

export default {
  getFacility: createReducer<GetFacilityState>(getFacilityState, builder => {
    builder
      .addCase(getFacilityAction, draft => {
        draft.status = 'INIT';
      })
      .addCase(getFacilityFinishAction, (draft, { payload }) => {
        draft.status = 'FINISH';
        draft.data = payload.data;
      });
  }),
};
