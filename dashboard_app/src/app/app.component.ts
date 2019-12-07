import { Component, OnDestroy } from '@angular/core';
import { RiskMeterService } from './services/risk-meter.service';
import { Subscription } from 'rxjs';
import { single } from 'rxjs/operators';
import { RiskMeterResposne } from '../../../dashboard_server/src/models/risk-meter-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private riskMeterResponseObservable : Subscription;

  public ready : boolean;
  public riskMeterResponse : RiskMeterResposne;

  constructor(riskMeterService : RiskMeterService) {
    this.ready = false;

    this.riskMeterResponseObservable = riskMeterService.getRiskMeter().pipe(single()).subscribe(response => {
      this.riskMeterResponse = response;
      this.ready = true;
    });
  }

  ngOnDestroy() : void {
    if (this.riskMeterResponseObservable)
      this.riskMeterResponseObservable.unsubscribe();
  }
}