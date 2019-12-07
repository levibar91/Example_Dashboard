import { Component, OnInit, Input, Output } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SeriesPieDataOptions } from 'highcharts';
import { CardModel } from 'src/app/models/cardModel';
import { Severity } from '../../../../../../dashboard_server/src/models/severity';

@Component({
  selector: 'severities-card',
  templateUrl: './severities-card.component.html',
  styleUrls: ['./severities-card.component.scss']
})
export class SeveritiesCardComponent implements OnInit {
  @Input() model : CardModel;
  @Output() description: string;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor() { 
    this.description = "SEVERITIES";
  }

  ngOnInit() {
    const chartData = this.getChartData();

    this.chartOptions = this.getChartOptions(chartData);
  }

  private getChartData(): Array<SeriesPieDataOptions> {
    return Object.keys(this.model.data).sort().map((severityName, i) => {
      const severityAmount = this.model.data[severityName];
      const severityDataOptions : SeriesPieDataOptions = {
        y: severityAmount,
        color: this.getColorForSeverity(severityName)
      };

      return severityDataOptions;
    });
  }

  private getColorForSeverity(severityName: string) : string {
    switch (severityName) {
      case Severity.high:
        return '#C33D3E';
      case Severity.medium:
        return '#DF9E26';
      case Severity.low:
        return '#419FC3';
    }
  }

  private getChartOptions(data : Array<SeriesPieDataOptions>) : Highcharts.Options {
    let chartOptions : Highcharts.Options = {
      chart: {
        backgroundColor: '#254462',
        renderTo: 'container',
        type: 'pie'
      },
      credits: {enabled: false},
      title: {
        text: null
      },
      exporting: {},
      plotOptions: {
        pie: {
          shadow: false,
          borderWidth: 0
        },
        series: {
            states: {
                hover: {
                    enabled: false
                },
                inactive: {
                    opacity: 1
                }
            }
        }
      },
      tooltip: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      series: [
        {
          name: 'Severities',
          data: data,
          size: '100%',
          innerSize: '88%',
          showInLegend: true,
          dataLabels: {
            enabled : false
          },
          type: "pie"
        }
      ]
    }; 

    return chartOptions;
  }
}