interface CheckinPayload {
  hide_room_rate: boolean;
  print_registration_card: boolean;
  reservation_detail: Array<Record<string, any>>;
  reservation_id: string;
}

export interface CheckinRequest {
  payload: CheckinPayload;
}

interface LateCheckoutFeePayload {
  reservation_detail: Array<Record<string, any>>;
  reservation_id: string;
}

export interface LateCheckoutFeeRequest {
  payload: LateCheckoutFeePayload;
}

interface CheckoutPayload {
  paid: Record<string, any>;
  payment_methods: Array<Record<string, any>>;
  reservation_detail_id: string;
  reservation_id: string;
  sales_detail_id: Array<Record<string, any>>;
  sales_info_id: string;
}

export interface CheckoutRequest {
  payload: CheckoutPayload;
}
