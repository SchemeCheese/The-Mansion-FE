import { createReducer } from '@reduxjs/toolkit';

import { searchCustomer, searchCustomerFinish } from 'actions';

import { CustomerSearchState } from 'types';

export const customerSearchState = {
  is_searching: false,
  data: [],
  current_page: 1,
  total: 0,
};

export default {
  customer: createReducer<CustomerSearchState>(customerSearchState, builder => {
    builder
      .addCase(searchCustomer, (draft, { payload }) => {
        draft.is_searching = true;
      })
      .addCase(searchCustomerFinish, (draft, { payload }) => {
        draft.is_searching = false;
        draft.data = payload.data;
        draft.total = payload.total;
        draft.current_page = payload.current_page;
      });
  }),
};
