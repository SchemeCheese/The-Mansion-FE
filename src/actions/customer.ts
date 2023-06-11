import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { CustomerSearch, CustomerSearchResult } from 'types';

export const searchCustomer = createAction(ActionTypes.CUSTOMER_SEARCH, (payload: CustomerSearch) =>
  actionPayload(payload),
);

export const searchCustomerFinish = createAction(
  ActionTypes.CUSTOMER_SEARCH_FINISH,
  (payload: CustomerSearchResult) => actionPayload(payload),
);
