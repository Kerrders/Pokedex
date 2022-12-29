import { Pipe, PipeTransform } from '@angular/core';
import { LanguageHelper } from '../helpers/languageHelper';
import moves from '../../assets/data/moves.json';
import moveNames from '../../assets/data/move_names.json';

@Pipe({
  name: 'moveName',
})
export class MoveNamePipe implements PipeTransform {
  transform(originalName: string): string {
    const move = moves.find((move) => move.identifier === originalName);
    if (!move) {
      return 'UNKNOWN_NAME';
    }
    return (
      moveNames.find(
        (moveName) =>
          moveName.move_id === move.id &&
          moveName.local_language_id &&
          parseInt(moveName.local_language_id) ===
            LanguageHelper.getLanguageId()
      )?.name ?? 'UNKNOWN_NAME'
    );
  }
}
