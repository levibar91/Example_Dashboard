"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var constants_1 = require("../utils/constants");
var JsonFileRepositoryService = /** @class */ (function () {
    function JsonFileRepositoryService() {
        this.ENCODING = 'utf8';
    }
    JsonFileRepositoryService.prototype.queryThreats = function () {
        var data = fs_1.default.readFileSync(constants_1.THREATS_FILE_LOCATION, this.ENCODING);
        var threats = JSON.parse(data);
        return threats;
    };
    return JsonFileRepositoryService;
}());
exports.JsonFileRepositoryService = JsonFileRepositoryService;
