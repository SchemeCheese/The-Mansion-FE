export interface ReservationSearch {
  agent_name?: string;
  booker_info?: string;
  checkin_from?: string;
  checkin_to?: string;
  checkout_from?: string;
  checkout_to?: string;
  current_page?: string | number;
  folio_number?: string;
  inhouse?: string;
  market?: string;
  per_page?: string | number;
  source?: string;
  status?: string;
  type?: string;
}

export interface ReservationPayload {
  booker_email: string;
  booker_email_2?: string;
  booker_firstname: string;
  booker_note?: string;
  booker_phone_number: string;
  booker_rank: string;
  booker_type: string;
  market_segment_id: string;
  no_deposit?: string;
  no_show?: string;
  note?: string;
  paid?: string;
  path_of_reservation: string;
  payment_method?: string;
  reservation_number: string;
  send_mail?: string;
}

export interface ReservationSearchResult {
  current_page: number;
  data: Array<Record<string, any>>;
  total: number;
}

export interface ReservationCreate {
  payload: ReservationPayload;
}
