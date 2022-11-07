import { createReducer } from '@reduxjs/toolkit';

import { setMainGuestAction, setMainGuestSuccessAction } from 'actions';

import { SetMainGuestState } from 'types';

export const setMainGuestState = {
  reservation_detail_id: '',
  guest_id: '',
  status: '',
};

export default {
  setMainGuest: createReducer<SetMainGuestState>(setMainGuestState, builder => {
    builder
      .addCase(setMainGuestAction, (draft, { payload }) => {
        draft.reservation_detail_id = payload.reservation_detail_id;
        draft.guest_id = payload.guest_id;
        draft.status = 'INIT';
      })
      .addCase(setMainGuestSuccessAction, draft => {
        draft.status = 'SUCCESS';
      });
  }),
};
