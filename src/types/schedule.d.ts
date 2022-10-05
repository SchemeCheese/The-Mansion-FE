export interface ScheduleSearch {
  end_date: string;
  start_date: string;
}

export interface ScheduleSearchResult {
  data: Array<Record<string, any>>;
}
