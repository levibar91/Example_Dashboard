import { TestBed } from '@angular/core/testing';

import { RiskMeterService } from './risk-meter.service';

describe('RiskMeterServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RiskMeterService = TestBed.get(RiskMeterService);
    expect(service).toBeTruthy();
  });
});
