import { PokemonMoves } from './PokemonMoves.interface';
import { PokemonSpecies } from './PokemonSpecies.interface';
import { PokemonSprite } from './PokemonSprite.interface';
import { PokemonStatInterface } from './PokemonStat.interface';

export interface PokemonDetails {
  stats: Array<PokemonStatInterface>;
  sprites: PokemonSprite;
  moves: Array<PokemonMoves>;
  species: PokemonSpecies;
  evolution_chain: any;
  [key: string]: unknown;
}
