import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'homeExponential'})
export class HomeExponentialPipe implements PipeTransform {
  public transform(value: number, exponent: number = 1): number {
    return Math.pow(value, exponent);
  }
}
