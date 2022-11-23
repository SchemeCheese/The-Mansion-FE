import { createReducer } from '@reduxjs/toolkit';

import {
  getReservationByFolio,
  getReservationByFolioFinish,
  resetReservationByFolio,
} from 'actions';

import { GetReservationByFolioState } from 'types';

export const getReservationByFolioState = {
  folio: '',
  data: {},
  is_finish: false,
};

export default {
  getReservationByFolio: createReducer<GetReservationByFolioState>(
    getReservationByFolioState,
    builder => {
      builder
        .addCase(getReservationByFolio, (draft, { payload }) => {
          draft.folio = payload.folio;
          draft.is_finish = false;
        })
        .addCase(getReservationByFolioFinish, (draft, { payload }) => {
          draft.data = payload.data;
          draft.is_finish = true;
        })
        .addCase(resetReservationByFolio, draft => {
          draft.folio = '';
          draft.is_finish = false;
          draft.data = {};
        });
    },
  ),
};
