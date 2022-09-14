export interface ReservationSearch {
  agent_name?: string;
  booker_info?: string;
  checkin_from?: string;
  checkin_to?: string;
  checkout_from?: string;
  checkout_to?: string;
  current_page?: string | number;
  folio_number?: string;
  inhouse?: string;
  market?: string;
  per_page?: string | number;
  source?: string;
  status?: string;
  type?: string;
}

export interface ReservationSearchResult {
  current_page: number;
  data: Array<Record<string, any>>;
  total: number;
}
