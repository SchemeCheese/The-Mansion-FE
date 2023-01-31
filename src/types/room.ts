export interface RoomSearch {
  charge_kind: string;
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
  total: number;
}

export interface SearchWalkinRoomFilter {
  current_page: number;
  is_smocking: string;
  room_number: string;
  room_type: string;
}

interface ReservationRoomItemFilter {
  booker_info: string;
  current_page: number;
  per_page: number;
  room_no: string;
  source_id: string;
  status: string;
}

export interface ReservationRoomFilter {
  filter: ReservationRoomItemFilter;
}

export interface ReservationRoomResult {
  data: any;
  total: number;
}
