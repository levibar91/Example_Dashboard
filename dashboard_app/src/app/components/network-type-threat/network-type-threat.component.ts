import { Component, OnInit, Input } from '@angular/core';
import { NetworkTypeThreats } from '../../../../../dashboard_server/src/models/risk-meter-response';
import { Dictionary } from 'src/app/models/dictionary';
import { CardModel } from 'src/app/models/cardModel';

@Component({
  selector: 'network-type-threat',
  templateUrl: './network-type-threat.component.html',
  styleUrls: ['./network-type-threat.component.scss']
})
export class NetworkTypeThreatComponent implements OnInit {

  @Input() private networkType : string;
  @Input() public networkThreats : NetworkTypeThreats;

  constructor() {
   }

  ngOnInit() {
  }

  getModel(data : Dictionary<number>) : CardModel {
    return {
      networkType: this.networkType,
      data : data
    };
  }
}