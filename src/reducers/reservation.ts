import { createReducer } from '@reduxjs/toolkit';

import { resetSearchReservation, searchReservation, searchReservationFinish } from 'actions';

import { ReservationSearchState } from 'types';

export const reservationSearchState = {
  reserved: {
    booker_info: '',
    agent_name: '',
    checkin_from: '',
    checkin_to: '',
    checkout_from: '',
    checkout_to: '',
    folio_number: '',
    inhouse_date: '',
    market: '',
    sort: '',
    source: '',
    status: '',
    type: '',
    is_searching: false,
    data: [],
    current_page: 1,
    total: 0,
    unread_msg: 0,
  },
  waitlist: {
    booker_info: '',
    agent_name: '',
    checkin_from: '',
    checkin_to: '',
    checkout_from: '',
    checkout_to: '',
    folio_number: '',
    inhouse_date: '',
    market: '',
    sort: '',
    source: '',
    status: '',
    type: '',
    is_searching: false,
    data: [],
    current_page: 1,
    total: 0,
    unread_msg: 0,
  },
  is_searching: false,
  type: 'reserved',
};

export default {
  reservation: createReducer<ReservationSearchState>(reservationSearchState, builder => {
    builder
      .addCase(searchReservation, (draft, { payload }) => {
        draft.type = payload.type;

        if (draft.type === 'reserved') {
          draft.reserved = {
            ...payload,
            data: [],
            total: 0,
            unread_msg: 0,
          };
        } else {
          draft.waitlist = {
            ...payload,
            data: [],
            total: 0,
            unread_msg: 0,
          };
        }

        draft.is_searching = true;
      })
      .addCase(searchReservationFinish, (draft, { payload }) => {
        draft.is_searching = false;

        if (draft.type === 'reserved') {
          draft.reserved.data = payload.data;
          draft.reserved.total = payload.total;
          draft.reserved.current_page = payload.current_page ?? 1;
          draft.reserved.unread_msg = payload.unread_msg;
        } else {
          draft.waitlist.data = payload.data;
          draft.waitlist.total = payload.total;
          draft.waitlist.current_page = payload.current_page ?? 1;
          draft.waitlist.unread_msg = payload.unread_msg;
        }
      })
      .addCase(resetSearchReservation, draft => {
        draft.is_searching = reservationSearchState.is_searching;
        draft.reserved = { ...reservationSearchState.reserved };
        draft.type = reservationSearchState.type;
        draft.waitlist = { ...reservationSearchState.waitlist };
      });
  }),
};
