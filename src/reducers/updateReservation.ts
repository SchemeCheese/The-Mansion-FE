import { createReducer } from '@reduxjs/toolkit';

import { updateReservation, updateReservationSuccess } from 'actions';

import { CreateReservationState } from 'types';

export const updateReservationState = {
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
};

export default {
  updateReservation: createReducer<CreateReservationState>(updateReservationState, builder => {
    builder
      .addCase(updateReservation, (draft, { payload }) => {
        draft.payload = payload.payload;
        draft.status = 'INIT';
      })
      .addCase(updateReservationSuccess, draft => {
        draft.status = 'SUCCESS';
      });
  }),
};
