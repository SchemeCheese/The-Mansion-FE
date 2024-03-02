export interface LoginCredentials {
  password: string;
  username: string;
}

export interface LoginSuccess {
  facility_id: string | number;
  name?: string;
  permission: Record<string, any>;
  username: string;
}
