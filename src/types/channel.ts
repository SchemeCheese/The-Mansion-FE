export interface FetchChannel {
  rate_type: string;
  start_date: string;
}

export interface FetchChannelResult {
  channels: Array<Record<string, any>>;
  dates: Array<Record<string, any>>;
}
