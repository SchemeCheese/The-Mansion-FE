import { createReducer } from '@reduxjs/toolkit';

import { searchReservation, searchReservationFinish } from 'actions';

import { ReservationSearchState } from 'types';

export const reservationSearchState = {
  booker_info: '',
  is_searching: false,
  data: [],
  current_page: 1,
  total: 0,
};

export default {
  reservation: createReducer<ReservationSearchState>(reservationSearchState, builder => {
    builder
      .addCase(searchReservation, (draft, { payload }) => {
        draft.booker_info = payload.booker_info ?? '';
        draft.is_searching = true;
      })
      .addCase(searchReservationFinish, (draft, { payload }) => {
        console.log('Finish', payload);

        draft.is_searching = false;
        draft.data = payload.data;
        draft.total = payload.total;
        draft.current_page = payload.current_page;
      });
  }),
};
