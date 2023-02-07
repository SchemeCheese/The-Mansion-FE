import { createReducer } from '@reduxjs/toolkit';

import { checkinAction, checkinSuccessAction } from 'actions';

import { CheckinState } from 'types';

export const checkinState = {
  payload: {
    reservation_id: '',
    hide_room_rate: false,
    print_registration_card: false,
    reservation_detail: [],
  },
  status: '',
};

export default {
  checkin: createReducer<CheckinState>(checkinState, builder => {
    builder
      .addCase(checkinAction, (draft, { payload }) => {
        draft.payload = payload.payload;
        draft.status = 'INIT';
      })
      .addCase(checkinSuccessAction, draft => {
        draft.status = 'SUCCESS';
      });
  }),
};
