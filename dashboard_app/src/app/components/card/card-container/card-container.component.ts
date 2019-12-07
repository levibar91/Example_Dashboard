import { Component, Input, ViewChild, ComponentFactoryResolver, OnInit } from '@angular/core';
import { CardHostDirective } from '../card-host.directive';
import { ThreatTypesCardComponent } from '../threat-types-card/threat-types-card.component';
import { SeveritiesCardComponent } from '../severities-card/severities-card.component';
import { SourceTypesCardComponent } from '../source-types-card/source-types-card.component';
import { CardModel } from 'src/app/models/cardModel';

@Component({
  selector: 'card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnInit {
  @Input() private cardType: string;
  @Input() public cardModel : CardModel;

  public description: string;

  @ViewChild(CardHostDirective, {static: true}) adHost: CardHostDirective;

  constructor(
      private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  ngOnInit(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.getCardType(this.cardType));

    const viewContainerRef = this.adHost.viewContainerRef;

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<any>componentRef.instance).model = this.cardModel;

    this.description = (<any>componentRef.instance).description;
  }

  private getCardType(cardType : string) : any {
    if (cardType.toLowerCase() === 'threat-types')
      return ThreatTypesCardComponent;
    else if (cardType.toLowerCase() === 'severities')
      return SeveritiesCardComponent;
    else if(cardType.toLowerCase() === 'source-types')
      return SourceTypesCardComponent;
  }
}
