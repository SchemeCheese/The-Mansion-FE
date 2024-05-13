export interface BranchsResult {
  data: Array<Record<string, any>>;
  updatedAt: number;
}

export interface GetBranchFacilityPayload {
  branchId: string;
}

export interface GetFacilityPayload {
  facility_id: string;
}

export interface GetFacilityPayloadFinishResult {
  data: Record<string, any>;
}

export interface GetBranchFacilityFinishPayload {
  data: Array<Record<string, any>>;
  updatedAt: number;
}

export interface BranchSelected {
  abbreviation: string;
  addition_cico_fee: number;
  branch_code: string;
  business_date: string;
  can_night_audit: boolean;
  channel_manager: boolean;
  facility_code: string;
  id: string | number;
  name: string;
  normal_time_check_in: string;
  normal_time_check_out: string;
  operator_code: string;
  warning_na_msg: string;
}
