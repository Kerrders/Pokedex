import { MoveName } from './MoveName.interface';

export interface PokemonMove {
  pokemon_id: number;
  version_group_id: number;
  move_id: number;
  pokemon_move_method_id: number;
  level: number;
  order: number;
  names: Array<MoveName>;
}
