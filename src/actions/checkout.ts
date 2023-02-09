import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { CheckoutRequest, LateCheckoutFeeRequest } from 'types';

export const addLateCheckoutFeeAction = createAction(
  ActionTypes.ADD_LATE_CHECKOUT_FEE,
  (payload: LateCheckoutFeeRequest) => actionPayload(payload),
);

export const addLateCheckoutFeeSuccessAction = createAction(
  ActionTypes.ADD_LATE_CHECKOUT_FEE_SUCCESS,
);

export const checkoutAction = createAction(ActionTypes.CHECKOUT, (payload: CheckoutRequest) =>
  actionPayload(payload),
);

export const checkoutSuccessAction = createAction(ActionTypes.CHECKOUT_SUCCESS);
