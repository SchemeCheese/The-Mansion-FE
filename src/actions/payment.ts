import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { CreatePayment } from 'types';

export const createPaymentAction = createAction(
  ActionTypes.PAYMENT_CREATE,
  (payload: CreatePayment) => actionPayload(payload),
);

export const createPaymentSuccess = createAction(ActionTypes.PAYMENT_CREATE_SUCCESS);
