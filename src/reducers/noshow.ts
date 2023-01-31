import { createReducer } from '@reduxjs/toolkit';

import {
  handleNoShowReservationDetailAction,
  handleNoShowReservationDetailFinishAction,
} from 'actions';

import { NoShowState } from 'types';

export const noshowState = {
  reservation_detail_id: 0,
  is_finish: false,
};

export default {
  noshow: createReducer<NoShowState>(noshowState, builder => {
    builder
      .addCase(handleNoShowReservationDetailAction, (draft, { payload }) => {
        draft.reservation_detail_id = payload.reservation_detail_id;
        draft.is_finish = false;
      })
      .addCase(handleNoShowReservationDetailFinishAction, draft => {
        draft.is_finish = true;
      });
  }),
};
