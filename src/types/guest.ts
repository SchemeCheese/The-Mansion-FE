export interface GuestPayload {
  date_of_birth: string;
  date_of_issue: string;
  expiration_date_passport: string;
  expiration_date_visa: string;
  operator_code: string;
  reservation_detail_id: string;
}

export interface GuestCreate {
  payload: GuestPayload;
}
