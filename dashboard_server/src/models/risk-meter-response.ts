import { Dictionary } from "express-serve-static-core";

export interface RiskMeterResposne {
  riskMeter: number;
  networkTypeThreats: Dictionary<NetworkTypeThreats>;
}

export interface NetworkTypeThreats {
  typesAmount: Dictionary<number>;
  severityAmount: Dictionary<number>;
  sourceTypesPercentage: Dictionary<number>;
}