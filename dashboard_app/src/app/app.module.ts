import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { CardContainerComponent } from './components/card/card-container/card-container.component';
import { NetworkTypeThreatComponent } from './components/network-type-threat/network-type-threat.component';
import { CardHostDirective } from './components/card/card-host.directive';
import { SeveritiesCardComponent } from './components/card/severities-card/severities-card.component';
import { ThreatTypesCardComponent } from './components/card/threat-types-card/threat-types-card.component';
import { SourceTypesCardComponent } from './components/card/source-types-card/source-types-card.component';
import { SeperateBySnakeOrCamelCasePipe } from './pipes/seperate-by-snake-or-camel-case.pipe';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CardContainerComponent,
    NetworkTypeThreatComponent,
    CardHostDirective,
    SeveritiesCardComponent,
    ThreatTypesCardComponent,
    SourceTypesCardComponent,
    SeperateBySnakeOrCamelCasePipe,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  entryComponents: [
    SeveritiesCardComponent,
    ThreatTypesCardComponent,
    SourceTypesCardComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }