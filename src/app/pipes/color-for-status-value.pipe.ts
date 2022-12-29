import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorForStatusValue',
})
export class ColorForStatusValuePipe implements PipeTransform {
  transform(statusValue: number): string {
    if (statusValue >= 100) {
      return 'green';
    } else if (statusValue >= 65) {
      return 'orange';
    }
    return 'red';
  }
}
