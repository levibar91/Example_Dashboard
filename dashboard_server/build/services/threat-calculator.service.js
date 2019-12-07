"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../utils/common");
var threat_type_1 = require("../models/threat-type");
var severity_1 = require("../models/severity");
var RiskMeterCalculator = /** @class */ (function () {
    function RiskMeterCalculator(repositoryService) {
        this.repositoryService = repositoryService;
    }
    RiskMeterCalculator.prototype.getRiskMeter = function () {
        var threats = this.repositoryService.queryThreats();
        var networkTypeThreatsByName = {};
        var sourceTypesAmountByNetworkThreats = {};
        for (var _i = 0, threats_1 = threats; _i < threats_1.length; _i++) {
            var threat = threats_1[_i];
            var networkType = threat.networkType;
            var type = threat.type;
            var severity = threat.severity;
            var sourceType = threat.sourceType;
            // Update the types and severity amount 
            var networkThreats = common_1.getOrAdd(networkTypeThreatsByName, networkType, function () { return { typesAmount: {}, severityAmount: {}, sourceTypesPercentage: {} }; });
            common_1.addOrUpdate(networkThreats.typesAmount, type, function (v) { return v + 1; }, function () { return 0; });
            common_1.addOrUpdate(networkThreats.severityAmount, severity, function (v) { return v + 1; }, function () { return 0; });
            // Update the source types amount based on their network type 
            var networkTypeSourceTypesAmount = common_1.getOrAdd(sourceTypesAmountByNetworkThreats, networkType, function () {
                return {
                    sourceTypeAmounts: {},
                    totalSourceTypes: 0
                };
            });
            common_1.addOrUpdate(networkTypeSourceTypesAmount.sourceTypeAmounts, sourceType, function (v) { return v + 1; }, function () { return 0; });
            networkTypeSourceTypesAmount.totalSourceTypes++;
        }
        this.populateSourceTypesPercentage(networkTypeThreatsByName, sourceTypesAmountByNetworkThreats);
        var severityStrength = this.calculateSeverityStrength(networkTypeThreatsByName);
        var threatTypeStrength = this.calculateTypeStrength(networkTypeThreatsByName);
        var riskMeter = Math.round((severityStrength + threatTypeStrength) / 2);
        return {
            networkTypeThreats: networkTypeThreatsByName,
            riskMeter: riskMeter
        };
    };
    RiskMeterCalculator.prototype.populateSourceTypesPercentage = function (networkTypeThreatsByName, sourceTypesAmountByNetworkThreats) {
        for (var networkType in networkTypeThreatsByName) {
            var networkTypeSourceTypeAmounts = sourceTypesAmountByNetworkThreats[networkType];
            for (var sourceType in networkTypeSourceTypeAmounts.sourceTypeAmounts) {
                var sourceTypeAmount = networkTypeSourceTypeAmounts.sourceTypeAmounts[sourceType];
                networkTypeThreatsByName[networkType].sourceTypesPercentage[sourceType] = Math.round((sourceTypeAmount / networkTypeSourceTypeAmounts.totalSourceTypes) * 100);
            }
        }
    };
    RiskMeterCalculator.prototype.calculateSeverityStrength = function (networkTypeThreatsByName) {
        var totalSeverityLevel = 0;
        var totalSeverityAmount = 0;
        for (var networkType in networkTypeThreatsByName) {
            var networkThreats = networkTypeThreatsByName[networkType];
            if (networkThreats == null || networkThreats.severityAmount == null)
                continue;
            for (var severity in networkThreats.severityAmount) {
                var severityAmount = networkThreats.severityAmount[severity];
                totalSeverityAmount += severityAmount;
                totalSeverityLevel += severityAmount * this.getSeverityScore(severity);
            }
        }
        return totalSeverityLevel / totalSeverityAmount;
    };
    RiskMeterCalculator.prototype.calculateTypeStrength = function (networkTypeThreatsByName) {
        var totalTypeLevel = 0;
        var totalTypeAmount = 0;
        for (var networkType in networkTypeThreatsByName) {
            var networkThreats = networkTypeThreatsByName[networkType];
            if (networkThreats == null || networkThreats.typesAmount == null)
                continue;
            for (var threatType in networkThreats.typesAmount) {
                var threatTypeAmount = networkThreats.typesAmount[threatType];
                totalTypeAmount += threatTypeAmount;
                totalTypeLevel += threatTypeAmount * this.getThreatTypeScore(threatType);
            }
        }
        return totalTypeLevel / totalTypeAmount;
    };
    RiskMeterCalculator.prototype.getSeverityScore = function (severity) {
        switch (severity) {
            case severity_1.Severity.high:
                return 100;
            case severity_1.Severity.medium:
                return 70;
            case severity_1.Severity.low:
                return 40;
            default:
                return 0;
        }
    };
    RiskMeterCalculator.prototype.getThreatTypeScore = function (threatType) {
        switch (threatType) {
            case threat_type_1.ThreatType.vip:
                return 100;
            case threat_type_1.ThreatType.attackIndication:
                return 80;
            case threat_type_1.ThreatType.exploitableData:
                return 60;
            case threat_type_1.ThreatType.brandSecurity:
                return 40;
            case threat_type_1.ThreatType.dataLeakage:
                return 20;
            case threat_type_1.ThreatType.phishing:
                return 10;
            default:
                return 0;
        }
    };
    return RiskMeterCalculator;
}());
exports.RiskMeterCalculator = RiskMeterCalculator;
