"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/server-host.ts
var host_1 = require("./host/host");
var serverHost = new host_1.Host();
var DEFAULT_PORT = 3000;
var args = process.argv.slice(2);
var port = DEFAULT_PORT;
if (args[0]) {
    var portArg = Number(args[0]);
    if (portArg && !isNaN(portArg))
        port = portArg;
}
serverHost.start(port);
