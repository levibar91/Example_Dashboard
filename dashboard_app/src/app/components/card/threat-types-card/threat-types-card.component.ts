import { Component, OnInit, Input, Output } from '@angular/core';
import { CardModel } from 'src/app/models/cardModel';

@Component({
  selector: 'threat-types-card',
  templateUrl: './threat-types-card.component.html',
  styleUrls: ['./threat-types-card.component.scss']
})
export class ThreatTypesCardComponent implements OnInit {

  @Input() model : CardModel;
  @Output() description: string;

  constructor() { 
    this.description = "TYPES";
  }

  ngOnInit() {
  }

}
