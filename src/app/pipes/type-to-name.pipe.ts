import { Pipe, PipeTransform } from '@angular/core';
import { PokemonTypeEnum } from '../enums/PokemonTypesEnum';

@Pipe({
  name: 'typeToName',
})
export class TypeToNamePipe implements PipeTransform {
  private readonly identifierMap = [
    { id: PokemonTypeEnum.NORMAL, identifier: 'normal' },
    { id: PokemonTypeEnum.FIGHTING, identifier: 'fighting' },
    { id: PokemonTypeEnum.FLYING, identifier: 'flying' },
    { id: PokemonTypeEnum.POISON, identifier: 'poison' },
    { id: PokemonTypeEnum.GROUND, identifier: 'ground' },
    { id: PokemonTypeEnum.ROCK, identifier: 'rock' },
    { id: PokemonTypeEnum.BUG, identifier: 'bug' },
    { id: PokemonTypeEnum.GHOST, identifier: 'ghost' },
    { id: PokemonTypeEnum.STEEL, identifier: 'steel' },
    { id: PokemonTypeEnum.FIRE, identifier: 'fire' },
    { id: PokemonTypeEnum.WATER, identifier: 'water' },
    { id: PokemonTypeEnum.GRASS, identifier: 'grass' },
    { id: PokemonTypeEnum.ELECTRIC, identifier: 'electric' },
    { id: PokemonTypeEnum.PSYCHIC, identifier: 'psychic' },
    { id: PokemonTypeEnum.ICE, identifier: 'ice' },
    { id: PokemonTypeEnum.DRAGON, identifier: 'dragon' },
    { id: PokemonTypeEnum.DARK, identifier: 'dark' },
    { id: PokemonTypeEnum.FAIRY, identifier: 'fairy' },
  ];
  transform(id: PokemonTypeEnum): string {
    return this.identifierMap.find((m) => m.id === id)?.identifier ?? '';
  }
}
