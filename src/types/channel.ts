export interface FetchChannel {
  fromDate: string;
}

export interface FetchChannelResult {
  channels: Array<Record<string, any>>;
  dates: Array<Record<string, any>>;
}
