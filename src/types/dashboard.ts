export interface FuelInfolResult {
  electric: Array<Record<string, any>>;
  water: Array<Record<string, any>>;
}

export interface FuelInfoPayload {
  type: string;
}
