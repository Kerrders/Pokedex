import { PokemonTypeEnum } from '../enums/PokemonTypesEnum';

export interface TypeEffectiveness {
  typeId: PokemonTypeEnum;
  damage: number;
}
