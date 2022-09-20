import { createReducer } from '@reduxjs/toolkit';

import { createReservation, createReservationSuccess } from 'actions';

import { CreateReservationState } from 'types';

export const updateReservationState = {
  payload: {
    reservation_number: '',
    market_segment_id: '',
    path_of_reservation: '',
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
};

export default {
  updateReservation: createReducer<CreateReservationState>(updateReservationState, builder => {
    builder
      .addCase(createReservation, (draft, { payload }) => {
        draft.payload = payload.payload;
        draft.status = 'INIT';
      })
      .addCase(createReservationSuccess, draft => {
        draft.status = 'SUCCESS';
      });
  }),
};
