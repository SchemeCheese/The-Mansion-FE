import { createReducer } from '@reduxjs/toolkit';

import { searchAvailableScheduleAction, searchAvailableScheduleActionSuccess } from 'actions';

import { SearchAvailableScheduleState } from 'types';

export const searchAvailableScheduleState = {
  data: [],
  is_searching: false,
  start_date: '',
  end_date: '',
  room_type: '',
  floor: '',
  reservation_detail_id: '',
  view: '',
  direction: '',
};

export default {
  searchAvailableSchedule: createReducer<SearchAvailableScheduleState>(
    searchAvailableScheduleState,
    builder => {
      builder
        .addCase(searchAvailableScheduleAction, (draft, { payload }) => {
          draft.is_searching = true;
          draft.start_date = payload.start_date;
          draft.end_date = payload.end_date;
          draft.room_type = payload.room_type;
          draft.floor = payload.floor;
          draft.reservation_detail_id = payload.reservation_detail_id;
          draft.view = payload.view;
          draft.direction = payload.direction;
        })
        .addCase(searchAvailableScheduleActionSuccess, (draft, { payload }) => {
          draft.data = payload.data;
          draft.is_searching = false;
        });
    },
  ),
};
