import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { NightAuditPayload, NoShowPayload } from 'types';

export const handleNoShowReservationDetailAction = createAction(
  ActionTypes.NIGHT_AUDIT_NO_SHOW,
  (payload: NoShowPayload) => actionPayload(payload),
);

export const handleNoShowReservationDetailFinishAction = createAction(
  ActionTypes.NIGHT_AUDIT_NO_SHOW_FINISH,
);

export const handleNightAuditAction = createAction(
  ActionTypes.NIGHT_AUDIT_HANDLE,
  (payload: NightAuditPayload) => actionPayload(payload),
);

export const handleNightAuditFinishAction = createAction(ActionTypes.NIGHT_AUDIT_HANDLE_FINISH);
