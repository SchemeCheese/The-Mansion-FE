export interface RoomSearch {
  checkin: string;
  checkout: string;
  room_type?: string;
}

export interface RoomSearchResult {
  charges: Array<Record<string, any>>;
  rates: Array<Record<string, any>>;
  total: number;
}
