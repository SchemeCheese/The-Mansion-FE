import { createReducer } from '@reduxjs/toolkit';

import { createReservation, createReservationSuccess, resetCreateReservation } from 'actions';

import { CreateReservationState } from 'types';

export const createReservationState = {
  payload: {
    reservation_number: '',
    market_segment_id: '',
    agent_info_id: '',
    note: '',
    booker_type: '',
    booker_firstname: '',
    booker_email: '',
    booker_phone_number: '',
    booker_rank: '',
    booker_email_2: '',
    booker_note: '',
    payment_method: '',
    paid: '',
    send_mail: '',
    no_show: '',
    no_deposit: '',
  },
  status: '',
  reservation_created: null,
};

export default {
  createReservation: createReducer<CreateReservationState>(createReservationState, builder => {
    builder
      .addCase(createReservation, (draft, { payload }) => {
        draft.payload = payload.payload;
        draft.status = 'INIT';
      })
      .addCase(createReservationSuccess, (draft, { payload }) => {
        draft.reservation_created = payload.reservation_info;
        draft.status = 'SUCCESS';
      })
      .addCase(resetCreateReservation, (draft, { payload }) => {
        draft.payload = {
          reservation_number: '',
          market_segment_id: '',
          agent_info_id: '',
          note: '',
          booker_type: '',
          booker_firstname: '',
          booker_email: '',
          booker_phone_number: '',
          booker_rank: '',
          booker_email_2: '',
          booker_note: '',
          payment_method: '',
          paid: '',
          send_mail: '',
          no_show: '',
          no_deposit: '',
        };
        draft.status = '';
        draft.reservation_created = null;
      });
  }),
};
