import { PokemonMoves } from './PokemonMoves.interface';
import { PokemonSprite } from './PokemonSprite.interface';
import { PokemonStatInterface } from './PokemonStat.interface';

export interface PokemonDetails {
  stats: Array<PokemonStatInterface>;
  sprites: PokemonSprite;
  moves: Array<PokemonMoves>;

  [key: string]: unknown;
}
