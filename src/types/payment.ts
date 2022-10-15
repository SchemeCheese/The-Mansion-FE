interface CreatePaymentPayload {
  payment_methods: Array<Record<string, any>>;
  reservation_detail_id: string;
  sales_detail_id: Array<Record<string, any>>;
  sales_info_id: string;
}

export interface CreatePayment {
  payload: CreatePaymentPayload;
}
