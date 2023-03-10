import { PokemonTypeEnum } from '../enums/PokemonTypesEnum';

export interface TypeEffectiveness {
  neutral: Array<PokemonTypeEnum>;
  strong: Array<PokemonTypeEnum>;
  weak: Array<PokemonTypeEnum>;
}
