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

export interface ElectricAreaResult {
  data: Array<Record<string, any>>;
}

export interface WaterAreaResult {
  data: Array<Record<string, any>>;
}

export interface ElectricPowerResult {
  data: Array<Record<string, any>>;
}
export interface DurationCurveResult {
  data: Array<Record<string, any>>;
  status: string;
}
