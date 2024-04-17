import { Pipe, PipeTransform } from '@angular/core';
import { PokemonTypeEnum } from '../enums/PokemonTypesEnum';
import { PokemonTypeHelper } from '../helpers/pokemonTypeHelper';

@Pipe({
  name: 'typeToName',
  standalone: true,
})
export class TypeToNamePipe implements PipeTransform {
  transform(id: PokemonTypeEnum): string {
    return (
      PokemonTypeHelper.identifierMap.find((m) => m.id === id)?.identifier ?? ''
    );
  }
}
