export interface RoomSearch {
  checkin: string;
  checkout: string;
  room_type: string;
  source_id: string;
  source_type: string;
}

export interface RoomSearchResult {
  charges: Array<Record<string, any>>;
  rates: Array<Record<string, any>>;
  total: number;
}

export interface RoomTypeResult {
  data: Array<Record<string, any>>;
}

export interface GetRoomResult {
  items: Array<Record<string, any>>;
}

export interface SearchWalkinRoomFilter {
  is_smocking: string;
  room_number: string;
  room_type: string;
}
