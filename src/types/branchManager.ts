interface BranchDataType {
  area: string;
  code: string;
  consumption: number;
  dailyAbg: number;
  name: string;
  yOY: number;
}

export interface BranchManagerResult {
  DataElectric: BranchDataType[];
  DataWater: BranchDataType[];
  status: string;
}
