import { Severity } from './severity';
import { ThreatType } from './threat-type';
import { SourceType } from './source-type';

export interface Threat {
  date: Date;
  severity: Severity;
  type: ThreatType;
  sourceType: SourceType;
  networkType: string;
}