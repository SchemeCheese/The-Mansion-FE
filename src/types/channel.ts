export interface FetchChannel {
  fromDate: string;
}

export interface FetchChannelResult {
  channels: Array<Record<string, any>>;
  dates: Array<Record<string, any>>;
  rates: Array<Record<string, any>>;
  websites: Array<Record<string, any>>;
}

interface UpdateRoomAvailablePayload {
  enabled_day: Array<string>;
  end_date: string;
  room_id: string;
  room_number: number;
  start_date: string;
}

export interface UpdateRoomAvailable {
  payload: UpdateRoomAvailablePayload;
}
