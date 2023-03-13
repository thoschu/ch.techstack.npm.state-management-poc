import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'homeExponential'})
export class HomeExponentialPipe implements PipeTransform {
  private static readonly defaultExponent: number = 1;

  public transform(value: number, exponent: number = HomeExponentialPipe.defaultExponent): number {
    return Math.pow(value, exponent);
  }
}
