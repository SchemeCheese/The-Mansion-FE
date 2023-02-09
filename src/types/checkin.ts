interface CheckinPayload {
  hide_room_rate: boolean;
  print_registration_card: boolean;
  reservation_detail: Array<Record<string, any>>;
  reservation_id: string;
}

export interface CheckinRequest {
  payload: CheckinPayload;
}
