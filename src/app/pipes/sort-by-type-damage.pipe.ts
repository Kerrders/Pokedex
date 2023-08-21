import { Pipe, PipeTransform } from '@angular/core';
import { TypeEffectiveness } from '../interfaces/TypeEffectiveness';

@Pipe({
  name: 'sortByTypeDamage',
})
export class SortByTypeDamagePipe implements PipeTransform {
  transform(
    types: Array<TypeEffectiveness> | undefined
  ): Array<TypeEffectiveness> | undefined {
    return types?.sort(function (a, b) {
      return b.damage - a.damage;
    });
  }
}
