import { Pipe, PipeTransform } from '@angular/core';
import { PokemonSpeciesName } from '../interfaces/PokemonSpeciesName.interface';

@Pipe({
  name: 'pokemonSpeciesName',
})
export class PokemonSpeciesNamePipe implements PipeTransform {
  transform(names: Array<PokemonSpeciesName>, langId: number): string {
    return (
      names.find((name) => name.local_language_id === langId)?.name ?? 'UNKNOWN'
    );
  }
}
