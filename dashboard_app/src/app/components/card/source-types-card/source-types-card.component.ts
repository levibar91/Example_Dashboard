import { Component, OnInit, Input, Output } from '@angular/core';
import { CardModel } from 'src/app/models/cardModel';

@Component({
  selector: 'source-types-card',
  templateUrl: './source-types-card.component.html',
  styleUrls: ['./source-types-card.component.scss']
})
export class SourceTypesCardComponent implements OnInit {
  @Input() model : CardModel;
  @Output() description: string;

  constructor() { 
    this.description = "SOURCES (%)";
  }

  ngOnInit() {
  }
}