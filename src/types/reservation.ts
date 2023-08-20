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
  unread_msg?: string;
}

export interface ReservationPayload {
  agent_info_id: string;
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
  payment_method?: string;
  reservation_id?: number | string;
  reservation_number: string;
  rooms: Array<Record<string, any>>;
  send_mail?: string;
}

export interface GetReservationPayload {
  reservation_id: string;
}

export interface GetReservationFinishPayload {
  data: Array<Record<string, any>>;
}

export interface GetReservationByFolioPayload {
  folio: string;
}

export interface GetReservationByFolioFinishPayload {
  data: Array<Record<string, any>>;
}

export interface ReservationSearchResult {
  current_page: number;
  data: Array<Record<string, any>>;
  total: number;
  unread_msg: number;
}

export interface CreateReservationResult {
  reservation_info: any;
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

export interface AddReservationDetailPayload {
  client_info_id: string;
  reservation_id: string;
  rooms: Array<Record<string, any>>;
}

export interface AddReservationDetail {
  payload: AddReservationDetailPayload;
}

export interface CancelReservationDetailPayload {
  cancel_reason: string;
  cancel_type: string;
  client_info_id: string;
  reservation_detail_id: number[];
  reservation_id: string;
}

export interface CancelReservationDetail {
  payload: CancelReservationDetailPayload;
}

export interface ReservationBookRoomPayload {
  reservation_detail_id: string;
  reservation_id: string;
  rooms: Array<Record<string, any>>;
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

export interface ReservationUpdateGeneralInfoPayload {
  adults: number;
  baby: number | string;
  birthday: number | string;
  checkin_date: string;
  checkin_time: string;
  checkout_date: string;
  checkout_time: string;
  child: number;
  dropoff_required: number | string;
  dropoff_time: string;
  early_check_in: number;
  honeymoon: number | string;
  late_check_out: number;
  note: string;
  pickup_required: number | string;
  pickup_time: string;
  reservation_detail_id: string;
  reservation_id: string;
  room_type: number;
  transport_no_dropoff: string | number;
  transport_no_pickup: string | number;
}

export interface UpdateGeneralInfo {
  payload: ReservationUpdateGeneralInfoPayload;
}

export interface UpdateNoteReservationDetailPayload {
  note: string;
  reservation_detail_id: string | number;
  reservation_info_id: string | number;
}

export interface UpdateNoteReservationDetail {
  payload: UpdateNoteReservationDetailPayload;
}

export interface ResendEmailReservation {
  is_hide_room_rate: boolean;
  language: string;
  reservation_id: string;
}

export interface DownloadPDFReservationDetailPayload {
  file_name: string;
  language: string;
  reservation_info_id: string | number;
}

export interface DownloadPDFReservationDetail {
  payload: DownloadPDFReservationDetailPayload;
}

export interface DownloadDocxReservationDetailPayload {
  file_name: string;
  language: string;
  reservation_info_id: string | number;
}

export interface DownloadDocxReservationDetail {
  payload: DownloadDocxReservationDetailPayload;
}

export interface PrintRegistrationCardPDFReservationDetailPayload {
  file_name: string;
  language: string;
  reservation_detail_id: string | number;
  reservation_info_id: string | number;
}

export interface PrintRegistrationCardPDFReservationDetail {
  payload: PrintRegistrationCardPDFReservationDetailPayload;
}

export interface PrintDepositPDFReservationDetailPayload {
  file_name: string;
  language: string;
  payment_method: string;
  reservation_detail_id: string | number;
  reservation_info_id: string | number;
}

export interface PrintDepositPDFReservationDetail {
  payload: PrintDepositPDFReservationDetailPayload;
}

export interface PrintCheckinConfirmPDFReservationDetail {
  payload: PrintCheckinConfirmPDFReservationDetailPayload;
}

export interface PrintCheckinConfirmPDFReservationDetailPayload {
  file_name: string;
  hide_room_rate: string;
  language: string;
  reservation_detail_ids: any;
  reservation_info_id: string | number;
}

export interface PaymentVNPayReservationDetailPayload {
  amount: number;
  bank_code: string;
  reservation_detail_id: string | number;
  reservation_id: string | number;
}

export interface PaymentVNPayReservationDetail {
  payload: PaymentVNPayReservationDetailPayload;
}

export interface PaymentMomoPayReservationDetailPayload {
  amount: number;
  request_type: string;
  reservation_detail_id: string | number;
  reservation_id: string | number;
}

export interface PaymentMomoPayReservationDetail {
  payload: PaymentMomoPayReservationDetailPayload;
}
