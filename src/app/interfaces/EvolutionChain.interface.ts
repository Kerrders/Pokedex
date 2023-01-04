import { MoreToLoad } from './MoreToLoad.interface';

export interface EvolutionChain {
  evolves_to: Array<EvolutionChain>;
  is_baby: boolean;
  species: MoreToLoad;
}
