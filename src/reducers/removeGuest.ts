import { createReducer } from '@reduxjs/toolkit';

import { removeGuestAction, removeGuestSuccessAction } from 'actions';

import { RemoveGuestState } from 'types';

export const removeGuestState = {
  payload: {
    reservation_detail_id: '',
    guest_id: '',
  },
  status: '',
};

export default {
  removeGuest: createReducer<RemoveGuestState>(removeGuestState, builder => {
    builder
      .addCase(removeGuestAction, (draft, { payload }) => {
        draft.payload = payload.payload;
        draft.status = 'INIT';
      })
      .addCase(removeGuestSuccessAction, draft => {
        draft.status = 'SUCCESS';
      });
  }),
};
