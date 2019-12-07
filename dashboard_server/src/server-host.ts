// src/server-host.ts
import { Host } from './host/host';

const serverHost = new Host();

const DEFAULT_PORT : number = 3000;
const args = process.argv.slice(2);

let port : number = DEFAULT_PORT;

if (args[0])
{
  const portArg = Number(args[0]);

  if (portArg && !isNaN(portArg))
    port = portArg;
}

serverHost.start(port);