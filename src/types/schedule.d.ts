export interface ScheduleSearch {
  end_date: string;
  room_number: string;
  room_type: string;
  start_date: string;
}

export interface ScheduleSearchResult {
  data: Array<Record<string, any>>;
}
