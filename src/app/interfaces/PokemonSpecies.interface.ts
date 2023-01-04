import { MoreToLoad } from './MoreToLoad.interface';

export interface PokemonSpecies {
  evolution_chain: MoreToLoad;
  [key: string]: unknown;
}
