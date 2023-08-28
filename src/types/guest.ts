interface GuestPayload {
  date_of_birth: string;
  date_of_issue: string;
  expiration_date_passport: string;
  expiration_date_visa: string;
  guest_id?: string;
  operator_code: string;
  reservation_detail_id?: string;
}

interface RemoveGuestPayload {
  guest_id: string;
  reservation_detail_id: string;
}

export interface GuestCreate {
  payload: GuestPayload;
}

export interface GuestUpdate {
  payload: GuestPayload;
}

export interface GuestRemove {
  payload: RemoveGuestPayload;
}

export interface SetMainGuest {
  guest_id: string;
  reservation_detail_id: string;
}

export interface GetReservationCheckoutFromRoomNo {
  room_no: string;
}

export interface GetReservationCheckin {
  reservation_detail_id: string;
  reservation_info_id: string;
}

export interface GetReservationCheckoutFromRoomNoResult {
  data: Record<string, any>;
}

export interface GetReservationCheckinResult {
  data: Record<string, any>;
}
