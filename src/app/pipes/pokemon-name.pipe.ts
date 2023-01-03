import { Pipe, PipeTransform } from '@angular/core';
import { LanguageHelper } from '../helpers/languageHelper';

@Pipe({
  name: 'pokemonName',
})
export class PokemonNamePipe implements PipeTransform {
  transform(originalName: string, langId: number): string {
    return LanguageHelper.getPokemonName(originalName, langId);
  }
}
