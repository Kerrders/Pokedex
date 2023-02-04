import { PokemonMoves } from './PokemonMoves.interface';
import { PokemonSprite } from './PokemonSprite.interface';
import { PokemonStatInterface } from './PokemonStat.interface';
import { PokemonTypes } from './PokemonTypes.interface';

export interface PokemonDetails {
  stats: Array<PokemonStatInterface>;
  sprites: PokemonSprite;
  moves: Array<PokemonMoves>;
  types: Array<PokemonTypes>;

  [key: string]: unknown;
}
