import { createReducer } from '@reduxjs/toolkit';

import { getHouseKeepingAction, getHouseKeepingFinishAction } from 'actions';

import { HouseKeepingState } from 'types';

export const getHouseKeepingState = {
  status: '',
  current_page: 1,
  items: [],
  per_page: 10,
  total: 0,
};

export default {
  getHouseKeeping: createReducer<HouseKeepingState>(getHouseKeepingState, builder => {
    builder
      .addCase(getHouseKeepingAction, draft => {
        draft.current_page = 1;
        draft.items = [];
        draft.per_page = 10;
        draft.status = 'INIT';
        draft.total = 0;
      })
      .addCase(getHouseKeepingFinishAction, (draft, { payload }) => {
        draft.current_page = payload.current_page;
        draft.items = payload.items;
        draft.per_page = payload.per_page;
        draft.status = 'SUCCESS';
        draft.total = payload.total;
      });
  }),
};
