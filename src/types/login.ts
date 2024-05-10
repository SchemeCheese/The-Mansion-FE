export interface LoginCredentials {
  password: string;
  username: string;
}

export interface LoginSuccess {
  branch_id: string | number;
  can_switch_branch: boolean;
  facility_id: string | number;
  name?: string;
  permission: Record<string, any>;
  username: string;
}
