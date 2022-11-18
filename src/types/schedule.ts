export interface ScheduleSearch {
  end_date: string;
  room_number: string;
  room_type: string;
  start_date: string;
}

export interface ScheduleSearchResult {
  data: Array<Record<string, any>>;
}

export interface AvailableScheduleSearch {
  direction: string;
  end_date: string;
  floor: string;
  reservation_detail_id: string;
  room_type: string;
  start_date: string;
  view: string;
}

export interface AvailableScheduleResult {
  data: Array<Record<string, any>>;
}
