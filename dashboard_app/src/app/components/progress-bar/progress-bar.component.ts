import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() public height: number;
  @Input() public value: number;
  @Input() public backgroundColor: string;
  @Input() public colors: Array<string>;

  public hideValue: number;
  private gradientCss: string;

  constructor() {
   }

  ngOnInit() {

    // This value indicates how much of the gradient bar we want to cover, if the progress bar needs to show 20%, we will hide 80%
    this.hideValue = 100 - this.value;

    if (!this.colors || this.colors.length === 0)
      return;

    let gradient: string = ''; 
    
    if (this.colors.length === 1) {
      gradient = `${this.colors[0]},${this.colors[0]}`;
    }
    else {
      // Getting the colors percentages for the colors given, for example:
      // If we got ['red', 'blue', 'green'] than we would get:
      // red 0%, blue 50%, green 100%
      const gradientColorsPercentages = this.colors.map((color : string, index : number) => {
        return `${color} ${this.getColorGradientPercentage(index, this.colors.length)}%`;
      }).join(',');

      gradient = `left, ${gradientColorsPercentages}`;
    }

    this.gradientCss = `-webkit-linear-gradient(${gradient})`;
  }

  public getGradient(): string {
    return this.gradientCss;
  }

  // Getting the gradient percentage by a calculation of the value we just got and the range of values we have
  private getColorGradientPercentage(value : number, length: number): number {
    // scale a range [min,max] to [a,b]
    //        (b-a)(x - min)
    // f(x) = --------------  + a
    //           max - min
    // max = length - 1
    // min = 0
    // a = 0
    // b = 100

    if (length === 1)
      return 100;

    const min = 0;
    const max = length - 1;
    const a = 0;
    const b = 100;
    const x = value;
    const numerator = (b - a) * (x - min);
    const denominator = max - min;

    const divisionResult = numerator / denominator;

    return Math.round(divisionResult + a);
  }
}