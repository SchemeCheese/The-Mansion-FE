import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import {
  CreatePayment,
  CreateQRCodeVNPay,
  CreateQRCodeVNPaySuccess,
  UpdatePaymentDetail,
} from 'types';

export const createPaymentAction = createAction(
  ActionTypes.PAYMENT_CREATE,
  (payload: CreatePayment) => actionPayload(payload),
);

export const createPaymentSuccess = createAction(ActionTypes.PAYMENT_CREATE_SUCCESS);

export const createQRCodeVNPayAction = createAction(
  ActionTypes.CREATE_QRCODE_VNPAY,
  (payload: CreateQRCodeVNPay) => actionPayload(payload),
);

export const createQRCodeVNPaySuccessAction = createAction(
  ActionTypes.CREATE_QRCODE_VNPAY_SUCCESS,
  (payload: CreateQRCodeVNPaySuccess) => actionPayload(payload),
);

export const updatePaymentDetail = createAction(
  ActionTypes.UPDATE_PAYMENT_DETAIL,
  (payload: UpdatePaymentDetail) => actionPayload(payload),
);

export const updatePaymentDetailSuccess = createAction(ActionTypes.UPDATE_PAYMENT_DETAIL_SUCCESS);
