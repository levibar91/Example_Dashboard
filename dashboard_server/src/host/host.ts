// lib/app.ts
import express from 'express';
import { JsonFileRepositoryService } from '../services/repository.service';
import { RiskMeterCalculator } from '../services/threat-calculator.service';

export class Host {
  private app: express.Application = express();

  constructor () {
    const repostirotyService = new JsonFileRepositoryService();
    const riskMeterCalculator = new RiskMeterCalculator(repostirotyService);

    this.app.get('/api/get-risk-meter', (req, res) => {
      try {
        const riskMeter = riskMeterCalculator.getRiskMeter();

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(riskMeter);
      }
      catch (error) {
        res.status(500).send('There was an error getting the risk meter, try again later');
      }
    });
  }

  public start(port : number) : void {
    this.app.listen(port, () => {
      console.log(`Started server listening on port ${port}!`);
    });
  }
}