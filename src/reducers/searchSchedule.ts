import { createReducer } from '@reduxjs/toolkit';

import { searchScheduleAction, searchScheduleActionSuccess } from 'actions';

import { SearchScheduleState } from 'types';

export const searchScheduleState = {
  data: [],
  is_searching: false,
  start_date: '',
  end_date: '',
};

export default {
  searchSchedule: createReducer<SearchScheduleState>(searchScheduleState, builder => {
    builder
      .addCase(searchScheduleAction, (draft, { payload }) => {
        draft.is_searching = false;
        draft.start_date = payload.start_date;
        draft.end_date = payload.end_date;
      })
      .addCase(searchScheduleActionSuccess, (draft, { payload }) => {
        draft.data = payload.data;
        draft.is_searching = true;
      });
  }),
};
