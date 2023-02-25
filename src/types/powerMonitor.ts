export interface DeviceManagerResult {
  data: Array<Record<string, any>>;
}

export interface DownloadCSVBranchManagerPayload {
  cate_id: number | string;
  end_date: string;
  file_name: string;
  language: string;
  start_date: string;
}

export interface DownloadCSVBranchManager {
  payload: DownloadCSVBranchManagerPayload;
}
