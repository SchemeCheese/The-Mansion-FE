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
  booker_lastname?: string;
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
  reservation_id?: number | string;
  reservation_number: string;
  rooms: any;
  send_mail?: string;
}

export interface GetReservationPayload {
  reservation_id: string;
}

export interface GetReservationFinishPayload {
  data: Array<Record<string, any>>;
}

export interface ReservationSearchResult {
  current_page: number;
  data: Array<Record<string, any>>;
  total: number;
}

export interface ReservationCreate {
  payload: ReservationPayload;
}

export interface ReservationUpdateRatePayload {
  charges: Array<Record<string, any>>;
  reservation_detail_id: string;
  reservation_id: string;
}

export interface UpdateRate {
  payload: ReservationUpdateRatePayload;
}

export interface ReservationBookRoomPayload {
  id: string;
}

export interface BookRoom {
  payload: ReservationBookRoomPayload;
}

export interface ReservationNumberGetPayload {
  branch_code: string;
  facility_code: string;
  operator_code: string;
}

export interface ReservationNumberResult {
  reservation_number: string;
}

export interface ReservationDetail {
  reservation_detail_id: string;
  reservation_id: string;
}

export interface ReservationDetailFinish {
  data: Record<string, any>;
}
