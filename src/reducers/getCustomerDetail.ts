import { createReducer } from '@reduxjs/toolkit';

import {
  getCustomerDetailAction,
  getCustomerDetailSuccessAction,
  searchCustomer,
  searchCustomerFinish,
} from 'actions';

import { GetCustomerDetailState } from 'types';

export const getCustomerDetailState = {
  is_finish: false,
  data: {},
  id: '',
};

export default {
  getCustomerDetail: createReducer<GetCustomerDetailState>(getCustomerDetailState, builder => {
    builder
      .addCase(getCustomerDetailAction, (draft, { payload }) => {
        draft.is_finish = false;
        draft.id = payload.id;
      })
      .addCase(getCustomerDetailSuccessAction, (draft, { payload }) => {
        draft.is_finish = true;
        draft.data = payload.data;
      });
  }),
};
