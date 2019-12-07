import { Pipe, PipeTransform } from '@angular/core';
import { seperateBySnakeOrCamelCase } from '../common/string-manipulations';

@Pipe({
  name: 'seperateBySnakeOrCamelCase'
})
export class SeperateBySnakeOrCamelCasePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return seperateBySnakeOrCamelCase(value);
  }
}