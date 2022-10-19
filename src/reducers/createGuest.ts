import { createReducer } from '@reduxjs/toolkit';

import { createGuest, createGuestSuccess } from 'actions';

import { CreateGuestState } from 'types';

export const createGuestState = {
  payload: {
    operator_code: '',
    reservation_detail_id: '',
    expiration_date_passport: '',
    expiration_date_visa: '',
    date_of_issue: '',
    date_of_birth: '',
  },
  status: '',
};

export default {
  createGuest: createReducer<CreateGuestState>(createGuestState, builder => {
    builder
      .addCase(createGuest, (draft, { payload }) => {
        draft.payload = payload.payload;
        draft.status = 'INIT';
      })
      .addCase(createGuestSuccess, draft => {
        draft.status = 'SUCCESS';
      });
  }),
};
