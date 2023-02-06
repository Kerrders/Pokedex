import { MoveName } from './MoveName.interface';

export interface FilteredPokemonMoves {
  id: number;
  level: number;
  method: number;
  names: Array<MoveName>;
}
