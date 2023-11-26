import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import {
  GetMonthlyInvoiceParam,
  GetMonthlyInvoiceResult,
  PaymentMonthlyInvoicePayload,
} from 'types';

export const getMonthlyInvoicesAction = createAction(
  ActionTypes.GET_MONTHLY_INVOICE,
  (payload: GetMonthlyInvoiceParam) => actionPayload(payload),
);
export const getMonthlyInvoicesActionFinish = createAction(
  ActionTypes.GET_MONTHLY_INVOICE_FINISH,
  (payload: GetMonthlyInvoiceResult) => actionPayload(payload),
);

export const paymentMonthlyInvoiceAction = createAction(
  ActionTypes.PAYMENT_MONTHLY_INVOICE,
  (payload: PaymentMonthlyInvoicePayload) => actionPayload(payload),
);
export const paymentMonthlyInvoiceActionSuccess = createAction(
  ActionTypes.PAYMENT_MONTHLY_INVOICE_SUCCESS,
);
