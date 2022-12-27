import { PokemonSprite } from './PokemonSprite.interface';
import { PokemonStatInterface } from './PokemonStat.interface';

export interface PokemonDetails {
  stats: Array<PokemonStatInterface>;
  sprites: PokemonSprite;

  [key: string]: unknown;
}
