import { createReducer } from '@reduxjs/toolkit';

import { getMonthlyInvoicesAction, getMonthlyInvoicesActionFinish } from 'actions';

import { MonthlyInvoiceState } from 'types';

export const getMonthlyInvoiceState = {
  is_searching: false,
  data: [],
  reservation_detail_id: '',
  reservation_info_id: '',
};

export default {
  getMonthlyInvoice: createReducer<MonthlyInvoiceState>(getMonthlyInvoiceState, builder => {
    builder
      .addCase(getMonthlyInvoicesAction, (draft, { payload }) => {
        draft.is_searching = true;
        draft.reservation_detail_id = payload.reservation_detail_id;
        draft.reservation_info_id = payload.reservation_info_id;
      })
      .addCase(getMonthlyInvoicesActionFinish, (draft, { payload }) => {
        draft.data = payload.data;
        draft.is_searching = false;
      });
  }),
};
