import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RiskMeterResposne } from '../../../../dashboard_server/src/models/risk-meter-response';

@Injectable({
  providedIn: 'root'
})
export class RiskMeterService {

  private readonly riskMeterApi = 'http://localhost:3000/api/get-risk-meter';

  constructor(private http: HttpClient) {

   }

   getRiskMeter() : Observable<RiskMeterResposne> {
     return this.http.get<RiskMeterResposne>(this.riskMeterApi);
   }
}
