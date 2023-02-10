import { PokemonTypeEnum } from '../enums/PokemonTypesEnum';

export interface PokemonTypeEffectivness {
  neutral: Array<PokemonTypeEnum>;
  strong: Array<PokemonTypeEnum>;
  weak: Array<PokemonTypeEnum>;
}
