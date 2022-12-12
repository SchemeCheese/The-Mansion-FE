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
  operator_code: string;
}
