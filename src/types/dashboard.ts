export interface FuelInfolResult {
  electric: Array<Record<string, any>>;
  water: Array<Record<string, any>>;
}

export interface FuelInfoPayload {
  type: string;
}

export interface ElectricYesterdayResult {
  avgYesterday: number;
  dayPass: any | number;
  listData: Array<Record<string, any>>;
  totalMonth: number;
  totalYesterday: number;
}

export interface WaterYesterdayResult {
  avgYesterday: number;
  dayPass: any | number;
  listData: Array<Record<string, any>>;
  totalMonth: number;
  totalYesterday: number;
}
