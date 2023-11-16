import { createReducer } from '@reduxjs/toolkit';

import { paymentMonthlyInvoiceAction, paymentMonthlyInvoiceActionSuccess } from 'actions';

import { PaymentMonthlyInvoiceState } from 'types';

export const paymentMonthlyInvoiceState = {
  status: '',
  payload: {
    discount_amount: 0,
    payment_methods: [],
    reservation_detail_id: '',
    reservation_info_id: '',
    reservation_monthly_charge_id: [],
  },
};

export default {
  paymentMonthlyInvoice: createReducer<PaymentMonthlyInvoiceState>(
    paymentMonthlyInvoiceState,
    builder => {
      builder
        .addCase(paymentMonthlyInvoiceAction, (draft, { payload }) => {
          draft.status = 'INIT';
          draft.payload = payload.payload;
        })
        .addCase(paymentMonthlyInvoiceActionSuccess, draft => {
          draft.status = 'SUCCESS';
        });
    },
  ),
};
