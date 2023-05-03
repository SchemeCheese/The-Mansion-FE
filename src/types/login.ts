export interface LoginCredentials {
  password: string;
  username: string;
}

export interface LoginSuccess {
  branch_info: Record<string, any>;
  name?: string;
  permission: Record<string, any>;
  username: string;
}
