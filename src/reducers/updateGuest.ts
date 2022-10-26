import { createReducer } from '@reduxjs/toolkit';

import { updateGuestAction, updateGuestSuccessAction } from 'actions';

import { CreateGuestState } from 'types';

export const updateGuestState = {
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
  updateGuest: createReducer<CreateGuestState>(updateGuestState, builder => {
    builder
      .addCase(updateGuestAction, (draft, { payload }) => {
        draft.payload = payload.payload;
        draft.status = 'INIT';
      })
      .addCase(updateGuestSuccessAction, draft => {
        draft.status = 'SUCCESS';
      });
  }),
};
