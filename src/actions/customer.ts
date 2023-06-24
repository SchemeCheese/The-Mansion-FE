import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { CustomerDetail, CustomerDetailResult, CustomerSearch, CustomerSearchResult } from 'types';

export const searchCustomer = createAction(ActionTypes.CUSTOMER_SEARCH, (payload: CustomerSearch) =>
  actionPayload(payload),
);

export const searchCustomerFinish = createAction(
  ActionTypes.CUSTOMER_SEARCH_FINISH,
  (payload: CustomerSearchResult) => actionPayload(payload),
);

export const getCustomerDetailAction = createAction(
  ActionTypes.GET_CUSTOMER_DETAIL,
  (payload: CustomerDetail) => actionPayload(payload),
);

export const getCustomerDetailSuccessAction = createAction(
  ActionTypes.GET_CUSTOMER_DETAIL_SUCCESS,
  (payload: CustomerDetailResult) => actionPayload(payload),
);
