import { RiskMeterResposne, NetworkTypeThreats } from '../models/risk-meter-response';
import { IRepositoryService } from './repository.service';
import { getOrAdd, addOrUpdate } from '../utils/common';
import { Dictionary } from 'express-serve-static-core';
import { ThreatType } from '../models/threat-type';
import { Severity } from '../models/severity';

export interface IThreatCalculator {
  getRiskMeter() : RiskMeterResposne;
}

export class RiskMeterCalculator implements IThreatCalculator {

  private repositoryService : IRepositoryService;

  constructor (repositoryService : IRepositoryService) {
    this.repositoryService = repositoryService;
  }

  public getRiskMeter() : RiskMeterResposne {
    const threats = this.repositoryService.queryThreats();

    const networkTypeThreatsByName : Dictionary<NetworkTypeThreats> = {};
    const sourceTypesAmountByNetworkThreats : Dictionary<NetworkTypeSourceTypeAmounts> = {};

    for (const threat of threats) {
      const networkType = threat.networkType;
      const type = threat.type;
      const severity = threat.severity;
      const sourceType = threat.sourceType;

      // Update the types and severity amount 
      const networkThreats = getOrAdd<NetworkTypeThreats>(networkTypeThreatsByName, networkType, () => {return {typesAmount: {}, severityAmount: {}, sourceTypesPercentage: {}};});
      addOrUpdate<number>(networkThreats.typesAmount, type, v => v + 1, () => 0);
      addOrUpdate<number>(networkThreats.severityAmount, severity, v => v + 1, () => 0);

      // Update the source types amount based on their network type 
      const networkTypeSourceTypesAmount = getOrAdd<NetworkTypeSourceTypeAmounts>(sourceTypesAmountByNetworkThreats, networkType, () => {
        return { 
          sourceTypeAmounts: {},
          totalSourceTypes : 0
        };
      });

      addOrUpdate<number>(networkTypeSourceTypesAmount.sourceTypeAmounts, sourceType, v => v + 1, () => 0);
      networkTypeSourceTypesAmount.totalSourceTypes++;
    }

    this.populateSourceTypesPercentage(networkTypeThreatsByName, sourceTypesAmountByNetworkThreats);

    const severityStrength = this.calculateSeverityStrength(networkTypeThreatsByName);
    const threatTypeStrength = this.calculateTypeStrength(networkTypeThreatsByName);

    const riskMeter = Math.round((severityStrength + threatTypeStrength) / 2);

    return {
      networkTypeThreats : networkTypeThreatsByName,
      riskMeter : riskMeter
    };
  }

  private populateSourceTypesPercentage(networkTypeThreatsByName : Dictionary<NetworkTypeThreats>, sourceTypesAmountByNetworkThreats : Dictionary<NetworkTypeSourceTypeAmounts>) {
    for (const networkType in networkTypeThreatsByName) {
      const networkTypeSourceTypeAmounts = sourceTypesAmountByNetworkThreats[networkType];
            
      for (const sourceType in networkTypeSourceTypeAmounts.sourceTypeAmounts) {
        const sourceTypeAmount = networkTypeSourceTypeAmounts.sourceTypeAmounts[sourceType];

        networkTypeThreatsByName[networkType].sourceTypesPercentage[sourceType] = Math.round((sourceTypeAmount / networkTypeSourceTypeAmounts.totalSourceTypes) * 100);
      }
    }
  }

  private calculateSeverityStrength(networkTypeThreatsByName : Dictionary<NetworkTypeThreats>) : number {
    let totalSeverityLevel = 0;
    let totalSeverityAmount = 0;

    for (const networkType in networkTypeThreatsByName) {
      const networkThreats = networkTypeThreatsByName[networkType];

      if (networkThreats == null || networkThreats.severityAmount == null)
        continue;

      for (const severity in networkThreats.severityAmount) {
        const severityAmount = networkThreats.severityAmount[severity];
        totalSeverityAmount += severityAmount;

        totalSeverityLevel += severityAmount * this.getSeverityScore(severity as Severity);
      }
    }

    return totalSeverityLevel / totalSeverityAmount;
  }

  private calculateTypeStrength(networkTypeThreatsByName : Dictionary<NetworkTypeThreats>) : number {
    let totalTypeLevel = 0;
    let totalTypeAmount = 0;

    for (const networkType in networkTypeThreatsByName) {
      const networkThreats = networkTypeThreatsByName[networkType];

      if (networkThreats == null || networkThreats.typesAmount == null)
        continue;

      for (const threatType in networkThreats.typesAmount) {
        const threatTypeAmount = networkThreats.typesAmount[threatType];
        totalTypeAmount += threatTypeAmount;

        totalTypeLevel += threatTypeAmount * this.getThreatTypeScore(threatType as ThreatType);
      }
    }

    return totalTypeLevel / totalTypeAmount;
  }

  private getSeverityScore(severity : Severity) : number {
    switch (severity) {
      case Severity.high:
        return 100;
      case Severity.medium:
        return 70;
      case Severity.low:
        return 40;
      default:
        return 0;
      }
  }

  private getThreatTypeScore(threatType : ThreatType) : number {
    switch (threatType) {
      case ThreatType.vip:
        return 100;
      case ThreatType.attackIndication:
        return 80;
      case ThreatType.exploitableData:
        return 60;
      case ThreatType.brandSecurity:
        return 40;
      case ThreatType.dataLeakage:
        return 20;
      case ThreatType.phishing:
        return 10;
      default:
        return 0;
    }
  }
}

interface NetworkTypeSourceTypeAmounts {
  totalSourceTypes : number, 
  sourceTypeAmounts : Dictionary<number>
}