export interface BranchsResult {
  data: Array<Record<string, any>>;
}

export interface GetBranchFacilityPayload {
  branchId: string;
}

export interface GetBranchFacilityFinishPayload {
  data: Array<Record<string, any>>;
}

export interface BranchSelected {
  branch_code: string;
  facility_code: string;
  normal_time_check_in: string;
  normal_time_check_out: string;
  operator_code: string;
}
