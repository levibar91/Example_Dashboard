"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// lib/app.ts
var express_1 = __importDefault(require("express"));
var repository_service_1 = require("../services/repository.service");
var threat_calculator_service_1 = require("../services/threat-calculator.service");
var Host = /** @class */ (function () {
    function Host() {
        this.app = express_1.default();
        var repostirotyService = new repository_service_1.JsonFileRepositoryService();
        var riskMeterCalculator = new threat_calculator_service_1.RiskMeterCalculator(repostirotyService);
        this.app.get('/api/get-risk-meter', function (req, res) {
            try {
                var riskMeter = riskMeterCalculator.getRiskMeter();
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.send(riskMeter);
            }
            catch (error) {
                res.status(500).send('There was an error getting the risk meter, try again later');
            }
        });
    }
    Host.prototype.start = function (port) {
        this.app.listen(port, function () {
            console.log("Started server listening on port " + port + "!");
        });
    };
    return Host;
}());
exports.Host = Host;
