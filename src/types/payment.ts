interface CreatePaymentPayload {
  discount_amount: number;
  paid: Record<string, any>;
  payment_methods: Array<Record<string, any>>;
  reservation_detail_id: string;
  sales_detail_id: Array<Record<string, any>>;
  sales_info_id: string;
}

export interface CreatePayment {
  payload: CreatePaymentPayload;
}

interface CreateQRCodeVNPayPayload {
  amount: number;
  bill_number: string;
  reservation_detail_id: string | number;
  reservation_info_id: string | number;
  txn_desc: string;
  txn_id: string;
}

export interface CreateQRCodeVNPay {
  payload: CreateQRCodeVNPayPayload;
}

export interface CreateQRCodeVNPaySuccess {
  result: any;
}
