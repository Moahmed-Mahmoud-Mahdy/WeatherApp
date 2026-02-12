import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureConversion',
  standalone: true
})
export class TemperatureConversionPipe implements PipeTransform {

  transform(value:  number, unit: string ):number|null {
    if (value&& !isNaN(value)) {
      if (unit === 'C') {
        return value
      } else if (unit === 'F') {
        return (value * 9/5) + 32;
      }
    }
    return null;
  }

}
