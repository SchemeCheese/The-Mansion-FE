export interface HouseKeepingType {
  clean_state: number;
  code: string;
  direction: number;
  equipment_type_id: number;
  floor: number;
  id: number;
  is_smoking: false;
  name: string;
  occupied_state: number;
  size: number;
  state: number;
  type: string;
  view: number;
  wing: number;
}
export interface HouseKeepingSearch {
  current_page?: number | string;
  per_page?: number | string;
}
export interface HouseKeepingResult {
  current_page: number | string;
  items: HouseKeepingType[];
  per_page: number;
  total: number;
}
export interface HouseKeepingUpdate {
  clean_state: string | number;
  occupied_state: string | number;
  room_id: string | number;
}
