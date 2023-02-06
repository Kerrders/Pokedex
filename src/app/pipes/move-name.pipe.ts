import { Pipe, PipeTransform } from '@angular/core';
import { MoveName } from '../interfaces/MoveName.interface';

@Pipe({
  name: 'moveName',
})
export class MoveNamePipe implements PipeTransform {
  transform(names: Array<MoveName>, languageId: number): string {
    return (
      names.find((name) => name.local_language_id === languageId)?.name ??
      'UNKNOWN'
    );
  }
}
