import { createReducer } from '@reduxjs/toolkit';

import { handleNightAuditAction, handleNightAuditFinishAction } from 'actions';

import { NightAuditState } from 'types';

export const nightAuditState = {
  facility_id: 0,
  is_finish: false,
};

export default {
  nightAudit: createReducer<NightAuditState>(nightAuditState, builder => {
    builder
      .addCase(handleNightAuditAction, (draft, { payload }) => {
        draft.facility_id = payload.facility_id;
        draft.is_finish = false;
      })
      .addCase(handleNightAuditFinishAction, draft => {
        draft.is_finish = true;
      });
  }),
};
