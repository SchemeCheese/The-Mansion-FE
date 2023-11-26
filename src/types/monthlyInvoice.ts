export interface GetMonthlyInvoiceParam {
  reservation_detail_id: string;
  reservation_info_id: string;
}

export interface GetMonthlyInvoiceResult {
  data: Record<string, any>;
}

interface PaymentMonthlyInvoice {
  discount_amount: number;
  payment_methods: Array<Record<string, any>>;
  reservation_detail_id: string;
  reservation_info_id: string;
  reservation_monthly_charge_id: Array<Record<string, any>>;
}

export interface PaymentMonthlyInvoicePayload {
  payload: PaymentMonthlyInvoice;
}
