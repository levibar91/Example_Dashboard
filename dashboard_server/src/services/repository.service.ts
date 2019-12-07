import fs from 'fs';
import { Threat } from '../models/threat';
import { THREATS_FILE_LOCATION } from '../utils/constants';

export interface IRepositoryService {
  queryThreats() : Array<Threat>;
}

export class JsonFileRepositoryService implements IRepositoryService {
  private readonly ENCODING = 'utf8';

  public queryThreats() : Array<Threat> {
    const data = fs.readFileSync(THREATS_FILE_LOCATION, this.ENCODING);
    const threats = JSON.parse(data) as Array<Threat>;
    return threats;
  }
}