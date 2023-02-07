import { PokemonTypeEnum } from '../enums/PokemonTypesEnum';

export interface PokemonType {
  pokemon_id: number;
  type_id: PokemonTypeEnum;
  slot: number;
}
