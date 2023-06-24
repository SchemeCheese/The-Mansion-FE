export interface CustomerSearch {
  client_info: string | number;
  client_kind: string | number;
  client_rank: string | number;
  current_page?: string | number;
  per_page?: string | number;
  type?: string;
}

export interface CustomerSearchResult {
  current_page: number;
  data: Array<Record<string, any>>;
  total: number;
}

export interface CustomerDetail {
  id: string;
}

export interface CustomerDetailResult {
  data: Record<string, any>;
}
